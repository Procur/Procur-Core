/**
 * CompanyController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  show: function(req, res){
    //TODO: Add user lookup functionality + add company Slug
    var handle = req.param('id');
    Company.findOne({ handle: handle }, function(err, company){
      if (err) { return res.redirect('/error/notfound'); }
      if(company == undefined) {
        res.redirect('/error/notfound');
      }
      else{
        res.view({ company: company });
      }
    });
  },

  setup: function(req, res){
    var b = req.body;
  },

  create: function(req, res){
    var b = req.body;

    //CREATE HQ TOGGLE LOGIC
    Company.create({
      user: req.session.passport.user,
      name: b.companyName,
      phoneNumberCountryCode: b.companyPhoneCountryCode,
      phoneNumber: b.companyPhone,
      phoneExtension: b.companyPhoneExt,
      faxCountryCode: b.companyFaxCountryCode,
      faxNumber: b.companyFax,
      faxExtension: b.companyFaxExt,
      email: b.companyEmail,
      website: b.companyWebsite,
      industry: b.companyIndustry,
      employeeCount: b.companyEmployeeCount,
      active: true
    }, function(err, company){
      if(err){
        res.send(err);
      }
      else{
        if(b.companyIsHq == 'on') {
          Location.create({
            company: company.id,
            addressLine1: b.companyAddress1,
            addressLine2: b.companyAddress2,
            country: b.companyCountry,
            province: b.companyProvince,
            postalCode: b.companyPostalCode,
            isHq: true,
            type: 'HQ'
          }, function(err, location){
            if(err) { return res.redirect('/dashboard'); }
            User.update(req.session.user, { profileComplete: true }, function(err, user){
              if(err) { return res.redirect('/dashboard'); }
              res.redirect('/dashboard');
            });
          });
        }
        else {
          Location.create({
            company: company.id,
            addressLine1: b.companyAddress1,
            addressLine2: b.companyAddress2,
            country: b.companyCountry,
            province: b.companyProvince,
            postalCode: b.companyPostalCode,
            isHq: false,
            type: 'Other'
          }, function(err, location){
            if(err) { return res.redirect('/dashboard'); }
            Location.create({
              company: company.id,
              addressLine1: b.hqAddress1,
              addressLine2: b.hqAddress2,
              country: b.hqCountry,
              province: b.hqProvince,
              postalCode: b.hqPostalCode,
              isHq: true,
              type: 'HQ'
            }, function(err, location){
              if(err) { return res.redirect('/dashboard'); }
              User.update(req.session.user, { profileComplete: true }, function(err, user){
                if(err) return next(err);
                res.redirect('/dashboard');
              });
            });
          });
        }
      }
    });
  },

  buyerOrSupplier: function(req, res){
    res.view();
  },

  selectDefault: function(req, res){
    res.view();
  },

  setDefault: function(req, res){
    var destination = req.route.path;
    var user = req.session.passport.user;

    if (destination == '/buyerdefault'){
      Company.findOne({ user: user }, function(err, company){
        if (err) { res.redirect('/dashboard'); }
        Company.update(company, { primaryMode: 'buyer' }, function(err, company){
          if (err) { res.redirect('/dashboard'); }
          User.update(user, { activeMode: 'buyer' }, function (err, user) {
            if (err) { return res.redirect('/dashboard'); }
            res.redirect('/dashboard');
          });
        });
      });
    }
    else if (destination == '/supplierdefault') {
      Company.findOne({ user: user }, function(err, company){
        if (err) { res.redirect('/dashboard'); }
        Company.update(company, { primaryMode: 'supplier' }, function(err, company){
          if (err) { res.redirect('/dashboard'); }
          User.update(user, { activeMode: 'supplier' }, function (err, user){
            if (err) { res.redirect('/dashboard'); }
            res.redirect('/dashboard');
          });
        });
      });
    }
  },

  setBoth: function(req, res){
    var user = req.session.passport.user;

    Company.findOne({ user: user }, function(err, company){
      if(err) { res.redirect('/dashboard'); }
      Company.update(company, { buyer: true, supplier: true }, function(err, company){
        if(err) { res.redirect('/dashboard'); }
        res.redirect('/welcome/selectdefault');
      });
    });
  },

  buyerWizard: function(req, res){
    var isSupplierAndBuyer = function (company) {
      if (company.buyer === true && company.supplier === true) {
        return true;
      }
      else {
        return false;
      }
    };

    var user = req.session.passport.user;

    Company.findOne({ user: user }, function(err, company){
      if (err) { return res.redirect('/dashboard'); }
      if (isSupplierAndBuyer(company)) { return res.view(); }
      Company.update(company, { buyer: true, supplier: false }, function(err, company){
        if (err) { return res.redirect('/dashboard'); }
        User.update(user, { activeMode: 'buyer' }, function (err, user) {
          if (err) { return res.redirect('/dashboard'); }
          if (company) { res.view(); }
        });
      });
    });
  },

  supplierWizard: function(req, res){
    var isSupplierAndBuyer = function (company) {
      if (company.buyer === true && company.supplier === true) {
        return true;
      }
      else {
        return false;
      }
    };

    var user = req.session.passport.user;

    Company.findOne({ user: user }, function(err, company){
      if (err) { return res.redirect('/dashboard'); }
      if (isSupplierAndBuyer(company)) { return res.view(); }
      Company.update(company, { supplier: true, buyer: false }, function (err, company){
        if (err) { return res.redirect('/dashboard'); }
        User.update(user, { activeMode: 'supplier' }, function (err, user) {
          if (err) { return res.redirect('/dashboard'); }
          if (company) { res.view(); }
        });
      });
    });
  },

  selectHandle: function(req, res){
    res.view();
  },

  createHandle: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        Company.update(company, { handle: b.handle.toLowerCase() }, function(err, company){
          if(err) { return res.redirect('/dashboard'); }
          res.redirect('dashboard');
        });
      });
    });
  },

  changeHandle: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        res.view({ handle: company.handle });
      });
    });
  },

  updateHandle: function(req, res){
    var b = req.body;
    Company.findOne({ handle: b.handle }, function(err, company){
      if(err) { return res.redirect('/dashboard'); }
      if(company) {
        req.flash('message', 'Handle is unavailable'); //HANDLE UNAVAILABLE FLASH FOR BOTH CONDITIONS
        User.findOne({ id: req.session.passport.user }, function(err, user){
          if(err) { return res.redirect('/dashboard'); }
          Company.findOne({ user: user.id }, function(err, company){
            if(err) { return res.redirect('/dashboard'); }
            if (company.handle) {
              res.redirect('company/changehandle')
            }
            else {
              res.redirect('/selecthandle');
            }
          });
        });
      }
      else {
        User.findOne({ id: req.session.passport.user }, function(err, user){
          if(err) { return res.redirect('/dashboard'); }
          Company.findOne({ user: user.id }, function(err, company){
            if(err) { return res.redirect('/dashboard'); }
            Company.update(company, { handle: b.handle.toLowerCase() }, function(err, company){
              if(err) { return res.redirect('/dashboard'); }
              req.flash('message', 'Handle updated.');
              res.redirect('/dashboard');
            });
          });
        });
      }
    });
  },

  update: function(req, res){
    var payload = [],
        locationsPayload = {},
        viewLocations = {},
        companyId,
        buyerId,
        supplierId,
        userActiveMode;
    var error = 0;
    var locationsHelper = sails.config.locationsHelper;

    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      if(user === undefined){ return res.serverError(); }
      userActiveMode = user.activeMode;
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        companyId = company.id;
        payload.push(company);
        if (userActiveMode === "buyer") {
          Buyer.findOne({ company: companyId }, function(err, buyer){
            if(err) { return res.redirect('/dashboard'); }
            payload.push(buyer);
            Location.find().where({ buyer: buyer.id }).exec(function(err, locations){
              if(err) { return res.redirect('/dashboard'); }
              locationsPayload["buyer"] = locations;
              Location.find().where({ company: companyId }).exec(function(err, locations){
                if(err) { return res.redirect('/dashboard'); }
                locationsPayload["company"] = locations;
                viewLocations = locationsHelper.parseLocations(locationsPayload, "buyer");
                res.view({ user: userActiveMode, company: payload[0], buyer: payload[1], locations: viewLocations });
              });
            });
          });
        }
        else if (userActiveMode === "supplier") {
          Supplier.findOne({ company: company.id }, function(err, supplier){
            if(err) { return res.redirect('/dashboard'); }
            supplierId = supplier.id;
            payload.push(supplier);
            Location.find().where({ supplier: supplierId }).exec(function(err, locations){
              if(err) { return res.redirect('/dashboard'); }
              locationsPayload["supplier"] = locations;
              Location.find().where({ company: companyId }).exec(function(err, locations){
                if(err) { return res.redirect('/dashboard'); }
                locationsPayload["company"] = locations;
                viewLocations = locationsHelper.parseLocations(locationsPayload, "supplier");
                res.view({ user: userActiveMode, company: payload[0], supplier: payload[1], locations: viewLocations });
              });
            });
          });
        }
      });
    });
  },

  setUpdate: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        Company.update(company, {
          name: b.companyName,
          phoneNumber: b.companyPhone,
          phoneExtension: b.companyPhoneExt,
          faxCountryCode: b.companyFaxCountryCode,
          faxNumber: b.companyFax,
          faxExtension: b.companyFaxExt,
          email: b.companyEmail,
          website: b.companyWebsite,
          physicalAddress1: b.companyAddress1,
          physicalAddress2: b.companyAddress2,
          country: b.companyCountry,
          province: b.companyProvince,
          postalCode: b.companyPostalCode,
          hqAddress1: b.hqAddress1,
          hqAddress2: b.hqAddress2,
          hqCountry: b.hqCountry,
          hqProvince: b.hqProvince,
          hqPostalCode: b.hqPostalCode,
          //deprecated - companyType: b.companyType,
          industry: b.companyIndustry,
          employeeCount: b.companyEmployeeCount,
        }, function(err, company){
          if(err) { return res.redirect('/dashboard'); }
          res.redirect('/dashboard'); //TODO: Add success flash
        });
      });
    });
  },

  notFound: function(req, res){
    res.view();
  }


};
