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
    console.log(req);
    //TODO: Add user lookup functionality + add company Slug
    var companySlug = req.param('company');
    Company.findOne({ slug: companySlug }, function(err, company){
      if (err) return res.send(err, 500);
      res.view({ company: company });
    });
  },

  setup: function(req, res){
    var b = req.body;
  },

  create: function(req, res){
    var b = req.body;
    console.log(req.session.passport.user);
    console.log(req.body);
    console.log(b.companyName);

    //CREATE HQ TOGGLE LOGIC
    Company.create({
      user: req.session.passport.user,
      name: b.companyName,
      phoneNumber: b.companyPhone,
      phoneExtension: b.companyPhoneExt,
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
      companyType: b.companyType,
      industry: b.companyIndustry,
      employeeCount: b.companyEmployeeCount,
      active: true
    }, function(err, company){
      if(err){
        console.log("Failed at create company");
        res.send(err);
      }
      else{
        console.log("Company: " + company.name + " created.");

        User.update(req.session.user, { profileComplete: true }, function(err, user){
          if(err) return next(err);
          console.log(user)
        });

        res.redirect('/dashboard');
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
        if (err) res.redirect('/dashboard');
        Company.update(company, { primaryMode: 'buyer' }, function(err, company){
          if (err) res.redirect('/dashboard');
          console.log('Company updated: ' + company);
          res.redirect('/dashboard')
        });
      });
    }
    else if (destination == '/supplierdefault') {
      Company.findOne({ user: user }, function(err, company){
        if (err) res.redirect('/dashboard');
        Company.update(company, { primaryMode: 'supplier' }, function(err, company){
          if (err) res.redirect('/dashboard');
          console.log('Company updated: ' + company);
          res.redirect('/dashboard')
        });
      });
    }
  },

  setBoth: function(req, res){
    var user = req.session.passport.user;

    Company.findOne({ user: user }, function(err, company){
      if(err) res.redirect('/dashboard');
      console.log(company);
      Company.update(company, { buyer: true, supplier: true }, function(err, company){
        if(err) res.redirect('/dashboard');
        console.log(company);
        res.redirect('/welcome/selectdefault');
      });
    });
  },

  buyerWizard: function(req, res){
    res.view();
  },

  supplierWizard: function(req, res){
    res.view();
  },
};
