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
    var currentUser = req.session.passport.user;
    var locationsHelper = sails.config.locationsHelper;
    var waterlineHelper = sails.config.waterlineHelper;
    var productCategoryHelper = sails.config.productCategoryHelper;
    var payload = [];
    var locationsPayload = {};
    var viewLocations = {};
    var loginStatus;

    Company.findOne({ handle: handle }, function(err, company) {
      if (err) { return res.redirect('/error/notfound'); }
      if (!company) { return res.redirect('/404'); }
      if (company !== undefined) {
        payload.push(company);
        User.findOne({ id: currentUser }, function(err, user) {
          if (err) { return res.redirect('/dashboard'); }
          user === undefined ? loginStatus = false : loginStatus = true;
          payload.push(user);
          if (err) { return res.redirect('/dashboard'); }
          Location.find({ company: company.id }, function(err, location) {
            locationsPayload["company"] = location;
            if (payload[1].activeMode === "buyer" ) {
              locationsPayload["buyer"] = []; /* trash value until I redo locationsHelper :( */
              viewLocations = locationsHelper.parseLocations(locationsPayload, "buyer");
              
              Buyer.findOne({ company: payload[0].id }, function(err, buyer) {
                buyer = waterlineHelper.fixBuyerArrays(buyer);
                buyer = productCategoryHelper.getCategoryChild(buyer);
                payload.push(buyer);
                res.view({ company: payload[0], user: payload[1], buyer: payload[2], locations: viewLocations, loggedin: loginStatus });
              });
            }
            if (payload[1].activeMode === "supplier" ) {
              locationsPayload["supplier"] = []; /* trash value until I redo locationsHelper :( */
              viewLocations = locationsHelper.parseLocations(locationsPayload, "supplier");

              Supplier.findOne({ company: payload[0].id }, function(err, supplier) {
                supplier = waterlineHelper.fixSupplierArrays(supplier);
                supplier = productCategoryHelper.getCategoryChild(supplier);
                payload.push(supplier);
                res.view({ company: payload[0], user: payload[1], supplier: payload[2], locations: viewLocations, loggedin: loginStatus });
              });
            }
          });
        });
      }
    });

    /*Company.findOne({ handle: handle }, function(err, company) {
      if (err) { return res.redirect('/error/notfound'); }
      if (!company) { return res.redirect('/404'); }
      if (company !== undefined) {
        Location.find({ company: company.id }, function(err, location) {
          locationsPayload["company"] = location;
          viewLocations = locationsHelper.parseLocations(locationsPayload, "buyer");
          console.log("viewLocations is " + JSON.stringify(viewLocations, null, ' '));
          if (currentUser !== undefined) {
            User.findOne({ id: currentUser }, function(err, user) {
              if (err) { return res.redirect('/dashboard'); }
              if (user !== undefined) {
                res.view({ company: company, user: user, location: viewLocations, loggedin: true });
              }
              else {
                res.view({ company: company, loggedin: false });
              }
            });
          }
          else {
            res.view({ company: company, loggedin: false });
          }
        });
      }
    });*/
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

  checkHandleExists: function(req, res){
    if (req.isAjax === false) { res.redirect('404'); }

    var desiredHandle = req.param('newHandle');
    return Company.findOne({ handle: desiredHandle }, function(err, company) {
      if (err === undefined) { return res.send(false); }
      if (company) { return res.send(true); }
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
    var waterlineHelper = sails.config.waterlineHelper;

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
                payload.push(waterlineHelper.fixBuyerArrays(payload[1]));
                res.view({ user: userActiveMode, company: payload[0], buyer: payload[1], buyer2: payload[2], locations: viewLocations });
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
                payload.push(waterlineHelper.fixSupplierArrays(payload[1]));
                res.view({ user: userActiveMode, company: payload[0], supplier: payload[1], supplier2: payload[2], locations: viewLocations });
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
          //faxCountryCode: b.companyFaxCountryCode,
          //faxNumber: b.companyFax,
          //faxExtension: b.companyFaxExt,
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
