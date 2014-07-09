/**
 * CompanyController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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
    var async = require('async');
    var currentUser = req.session.passport.user;
    var locationsHelper = sails.config.locationsHelper;
    var waterlineHelper = sails.config.waterlineHelper;
    var productCategoryHelper = sails.config.productCategoryHelper;
    var sorHelper = sails.config.sorHelper;
    var payload = [];
    var locationsPayload = {};
    var viewLocations = {};
    var loggedin;

    currentUser === undefined ? loggedin = false : loggedin = true;

    Company.findOne({ handle: handle }, function(err, company) {
      if (err) { return res.redirect('/error/notfound'); }
      if (!company) { return res.redirect('/404'); }
      if (company !== undefined) {
        payload.push(company);
        User.findOne({ id: currentUser }, function(err, user) {
          if (err) { return res.redirect('/dashboard'); }
          payload.push(user);
          if (err) { return res.redirect('/dashboard'); }
          Location.find({ company: company.id }).exec(function(err, location) {
            locationsPayload["company"] = location;
            viewLocations = locationsHelper.parseLocations(locationsPayload);

            async.parallel(
              {
                buyer: function(callback) {
                  Buyer
                    .findOne({ company: payload[0].id })
                    .exec(function(err, buyer) {
                      if (err) { callback(err, null); }
                      else if (!buyer) { callback(null, undefined); }
                      else {
                        buyer = waterlineHelper.fixBuyerArrays(buyer);
                        buyer = productCategoryHelper.getCategoryChild(buyer);
                        buyer = sorHelper.appendViewFields(buyer);
                        payload.push(buyer);
                        callback(null, buyer);
                      }
                    });
                },
                supplier: function(callback) {
                  Supplier
                    .findOne({ company: payload[0].id })
                    .exec(function(err, supplier) {
                      if (err) { callback(err, null); }
                      else if (!supplier) { callback(null, undefined); }
                      else {
                        supplier = waterlineHelper.fixSupplierArrays(supplier);
                        supplier = productCategoryHelper.getCategoryChild(supplier);
                        supplier = sorHelper.appendViewFields(supplier);
                        payload.push(supplier);
                        callback(null, supplier);
                      }
                    });
                }
              },
              function(err, data) {
                if (data.buyer && data.supplier) {
                  res.view({ company: payload[0], user: payload[1], buyer: payload[2], supplier: payload[3], locations: viewLocations, loggedin: loggedin });
                }
                else if (data.buyer && (data.supplier === undefined)) {
                  res.view({ company: payload[0], user: payload[1], buyer: payload[2], locations: viewLocations, loggedin: loggedin });
                }
                else if ((data.buyer === undefined) && data.supplier) {
                  res.view({ company: payload[0], user: payload[1], supplier: payload[2], locations: viewLocations, loggedin: loggedin });
                }
              }
            )
          });
        });
      }
    });

  },

  toggleShow: function(req, res){
    var handle = req.param('id');
    var profileType = req.param('type');
    var async = require('async');
    var currentUser = req.session.passport.user;
    var locationsHelper = sails.config.locationsHelper;
    var waterlineHelper = sails.config.waterlineHelper;
    var productCategoryHelper = sails.config.productCategoryHelper;
    var payload = [];
    var locationsPayload = {};
    var viewLocations = {};
    var loggedin;

    currentUser === undefined ? loggedin = false : loggedin = true;

    Company.findOne({ handle: handle }, function(err, company) {
      if (err) { return res.redirect('/error/notfound'); }
      if (!company) { return res.redirect('/404'); }
      if (company !== undefined) {
        payload.push(company);
        User.findOne({ id: currentUser }, function(err, user) {
          if (err) { return res.redirect('/dashboard'); }
          payload.push(user);
          if (err) { return res.redirect('/dashboard'); }
          Location.find({ company: company.id }).exec(function(err, location) {
            locationsPayload["company"] = location;
            viewLocations = locationsHelper.parseLocations(locationsPayload);

            async.parallel(
              {
                buyer: function(callback) {
                  Buyer
                    .findOne({ company: payload[0].id })
                    .exec(function(err, buyer) {
                      if (err) { callback(err, null); }
                      else if (!buyer) { callback(null, undefined); }
                      else {
                        buyer = waterlineHelper.fixBuyerArrays(buyer);
                        buyer = productCategoryHelper.getCategoryChild(buyer);
                        payload.push(buyer);
                        callback(null, buyer);
                      }
                    });
                },
                supplier: function(callback) {
                  Supplier
                    .findOne({ company: payload[0].id })
                    .exec(function(err, supplier) {
                      if (err) { callback(err, null); }
                      else if (!supplier) { callback(null, undefined); }
                      else {
                        supplier = waterlineHelper.fixSupplierArrays(supplier);
                        supplier = productCategoryHelper.getCategoryChild(supplier);
                        payload.push(supplier);
                        callback(null, supplier);
                      }
                    });
                }
              },
              function(err, data) {
                switch(profileType) {
                  case ("supplier"):
                    res.view({ company: payload[0], user: payload[1], supplier: payload[3], locations: viewLocations, loggedin: loggedin, type: profileType });
                    break;
                  case ("buyer"):
                    res.view({ company: payload[0], user: payload[1], buyer: payload[2], locations: viewLocations, loggedin: loggedin, type: profileType });
                }
              }
            )
          });
        });
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

  checkCompanyExists: function(req, res){
    if (req.isAjax === false) { res.redirect('404'); }
    var desiredCompanyName = req.param('newCompanyName');
    return Company.findOne({ name: desiredCompanyName }, function(err, company) {
      if (err === undefined) { return res.send(false); }
      if (company) {return res.send(true); }
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

 /* update: function(req, res){
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
            Location.find().where({ company: companyId }).exec(function(err, locations){
              if(err) { return res.redirect('/dashboard'); }
              locationsPayload["company"] = locations;
              viewLocations = locationsHelper.parseLocations(locationsPayload);
              payload.push(waterlineHelper.fixBuyerArrays(payload[1]));
              res.view({ user: userActiveMode, company: payload[0], buyer: payload[1], buyer2: payload[2], locations: viewLocations });
            });
          });
        }
        else if (userActiveMode === "supplier") {
          Supplier.findOne({ company: company.id }, function(err, supplier){
            if(err) { return res.redirect('/dashboard'); }
            supplierId = supplier.id;
            payload.push(supplier);
            Location.find().where({ company: companyId }).exec(function(err, locations){
              if(err) { return res.redirect('/dashboard'); }
              locationsPayload["company"] = locations;
              viewLocations = locationsHelper.parseLocations(locationsPayload);
              payload.push(waterlineHelper.fixSupplierArrays(payload[1]));
              res.view({ user: userActiveMode, company: payload[0], supplier: payload[1], supplier2: payload[2], locations: viewLocations });
            });
          });
        }
      });
    });
  },

  /*setUpdate: function(req, res){
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
  },*/

  update: function(req, res){
    var userId = req.session.passport.user,
        targetUser,
        targetBuyer,
        targetSupplier,
        targetCompany,
        companyLocations,
        waterlineHelper = sails.config.waterlineHelper,
        locationsHelper = sails.config.locationsHelper;

    User.findOne({ id: userId }, function(err, user){
      if(err){ return res.redirect('/dashboard'); }
      if(user !== undefined){
        targetUser = user;
        Company.findOne({ user: user.id }, function (err, company){
          if(err){ return res.redirect('/dashboard'); }
          if(company !== undefined){
            targetCompany = company;
            if((company.buyer == true) && (company.supplier == true)){
              Buyer.findOne({ company: company.id }, function(err, buyer){
                if(err){ return res.redirect('/dashboard'); }
                if(buyer !== undefined){
                  targetBuyer = buyer;
                  Supplier.findOne({ company: company.id }, function(err, supplier){
                    if(err){ return res.redirect('/dashboard'); }
                    if(supplier !== undefined) {
                      targetSupplier = supplier;
                      Location.find().where({ company: company.id }).exec(function(err, locations){
                        if(err){ return res.redirect('/dashboard'); }
                        var locationsPayload = [];
                        locationsPayload["company"] = locations;
                        var parsedLocations = locationsHelper.parseLocations(locationsPayload);
                        var targetBuyer2 = waterlineHelper.fixBuyerArrays(targetBuyer);
                        var targetSupplier2 = waterlineHelper.fixSupplierArrays(targetSupplier);
                        res.view({
                          user: targetUser,
                          company: targetCompany,
                          buyer: targetBuyer,
                          buyer2: targetBuyer2,
                          supplier: targetSupplier,
                          supplier2: targetSupplier2,
                          companyLocations: parsedLocations
                        });
                      });
                    }
                    else {
                      return res.redirect('/dashboard');
                    }
                  });
                }
                else {
                  return res.redirect('/dashboard');
                }
              });
            }
            else if((company.buyer == true) && (company.supplier != true)){
              Buyer.findOne({ company: company.id }, function(err, buyer){
                if(err){ return res.redirect('/dashboard'); }
                if(buyer !== undefined){
                  targetBuyer = buyer;
                  Location.find().where({ company: company.id }).exec(function(err, locations){
                    if(err){ return res.redirect('/dashboard'); }
                    var locationsPayload = [];
                    locationsPayload["company"] = locations;
                    var parsedLocations = locationsHelper.parseLocations(locationsPayload);
                    var targetBuyer2 = waterlineHelper.fixBuyerArrays(targetBuyer);
                    res.view({
                      user: targetUser,
                      company: targetCompany,
                      buyer: targetBuyer,
                      buyer2: targetBuyer2,
                      companyLocations: parsedLocations
                    });
                  });
                }
                else {
                  return res.redirect('/dashboard');
                }
              });
            }
            else if((company.buyer != true) && (company.supplier == true)){
              Supplier.findOne({ company: company.id }, function(err, supplier){
                if(err){ return res.redirect('/dashboard'); }
                if(supplier !== undefined){
                  targetSupplier = supplier;
                  Location.find().where({ company: company.id }).exec(function(err, locations){
                    if(err){ return res.redirect('/dashboard'); }
                    var locationsPayload = [];
                    locationsPayload["company"] = locations;
                    var parsedLocations = locationsHelper.parseLocations(locationsPayload);
                    var targetSupplier2 = waterlineHelper.fixBuyerArrays(targetSupplier);                    res.view({
                      user: targetUser,
                      company: targetCompany,
                      supplier: targetSupplier,
                      supplier2: targetSupplier2,
                      companyLocations: parsedLocations
                    });
                  });
                }
                else {
                  return res.redirect('/dashboard');
                }
              });
            }
          }
          else {
            return res.redirect('/dashboard');
          }
        });
      }
      else {
        return res.redirect('/dashboard');
      }
    });
  },

  updateBasicCompanyDetails: function(req, res){
    var p = req.params.all(),
        name = p.name,
        phoneNumberCountryCode = p.phoneNumberCountryCode,
        phoneNumber = p.phoneNumber,
        phoneExtension = p.phoneExtension,
        faxCountryCode = p.faxCountryCode,
        faxNumber = p.faxNumber,
        faxExtension = p.faxExtension,
        email = p.email,
        website = p.website,
        industry = p.companyIndustry,
        hqAddressLine1 = p.hqAddressLine1,
        hqAddressLine2 = p.hqAddressLine2,
        hqCountry = p.hqCountry,
        hqProvince = p.hqProvince,
        hqPostalCode = p.hqPostalCode,
        employeeCount = p.employeeCount;
    User.findOne({ id: req.session.passport.user }, function(err,user){
      if(err){ return res.redirect('/dashboard'); }
      if(user !== undefined){
        Company.findOne({ user: user.id }, function(err, company){
          if(err){ return res.redirect('/dashboard'); }
          Company.update(company, {
            name: name,
            phoneNumberCountryCode: phoneNumberCountryCode,
            phoneNumber: phoneNumber,
            phoneExtension: phoneExtension,
            faxCountryCode: faxCountryCode,
            faxNumber: faxNumber,
            faxExtension: faxExtension,
            email: email,
            website: website,
            industry: industry,
            employeeCount: employeeCount
          }, function(err, company){
            if(err){ return res.send(err); }
            if(company !== undefined){
              Location.findOne({ company: company.id }, function(err, location){
                if(err){ return res.send(err); }
                if(company !== undefined){
                  Location.update(location,{
                    addressLine1: hqAddressLine1,
                    addressLine2: hqAddressLine2,
                    country: hqCountry,
                    province: hqProvince,
                    postalCode: hqPostalCode
                  }, function(err, company){
                    if(err){ return res.send(err); }
                    if(company !== undefined) {
                      res.send('success');
                    }
                    else {
                      res.send('failed');
                    }
                  });
                }
              });
            }
            else {
              res.send(err);
            }
          });
        });
      }
      else {
        return res.redirect('/dashboard');
      }
    });
  },

  updateBuyerInformation: function(req, res){

  },

  updateDescriptions: function(req, res){

  },

  updateLocations: function(req, res){

  },

  updatePhotosAndDownloads: function(req, res){

  },

  notFound: function(req, res){
    res.view();
  }


};
