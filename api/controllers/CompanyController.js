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
      if (err) return res.redirect('/error/notfound');
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

  selectHandle: function(req, res){
    res.view();
  },

  createHandle: function(req, res){
    var b = req.body;
    console.log(b);
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) return res.redirect('/dashboard');
      console.log(user);
      Company.findOne({ user: user.id }, function(err, company){
        if(err) return res.redirect('/dashboard');
        console.log(company);
        console.log(b.handle.toLowerCase());
        Company.update(company, { handle: b.handle.toLowerCase() }, function(err, company){
          if(err) return res.redirect('/dashboard');
          console.log('Handle, ' + company.handle + ' created for ' + company.name);
          res.redirect('dashboard');
        });
      });
    });
  },

  update: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) return res.redirect('/dashboard');
      Company.findOne({ user: user.id }, function(err, company){
        if(err) return res.redirect('/dashboard');
        res.view({ company: company })
      });
    });
  },

  setUpdate: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) return res.redirect('/dashboard');
      Company.findOne({ user: user.id }, function(err, company){
        if(err) return res.redirect('/dashboard');
        Company.update(company, {  }, function(err, company){
          if(err) return res.redirect('/dashboard');
          res.redirect('/dashboard', { message: 'Company info updated.'});
        });
      });
    });
  },

  notFound: function(req, res){
    res.view();
  }
};
