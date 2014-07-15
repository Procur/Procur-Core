/**
 * CompanyController
 *
 * @module      :: Controller
 *
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
            city: b.companyCity
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

  buyerOnly: function(req, res) {
    var user = req.session.passport.user;
    Company.findOne({ user: user }, function(err, company){
      if(err) { res.redirect('404'); }
      Company.update(company, { buyer: true, supplier: false }, function(err, company){
        if(err) { res.redirect('404'); }
      });
    });
    res.redirect('/welcome/buyer');
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

  supplierOnly: function(req, res) {
    var user = req.session.passport.user;
    Company.findOne({ user: user }, function(err, company){
      if(err) { res.redirect('404'); }
      Company.update(company, { buyer: false, supplier: true }, function(err, company){
        if(err) { res.redirect('404'); }
      });
    });
    res.redirect('/welcome/supplier');
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

  update: function(req, res) {
    var currentUser = req.session.passport.user,
        async = require('async'),
        locationsHelper = sails.config.locationsHelper,
        waterlineHelper = sails.config.waterlineHelper,
        payload = {},
        locationsPayload = {},
        viewLocations = {};

    User.findOne({ id: currentUser }, function(err, user) {
      if (err) { return res.redirect('/dashboard'); }
      if (user !== undefined) { payload["user"] = user; }
      Company.findOne({ user: payload.user.id }, function(err, company) {
        if (err) { return res.redirect('/dashboard'); }
        if (company) { payload["company"] = company; }
        Location.find().where({ company: payload["company"].id }).exec(function(err, locations) {
          if (err) { return res.redirect('/dashboard'); }
          locationsPayload["company"] = locations;
          viewLocations = locationsHelper.parseLocations(locationsPayload);

          async.parallel(
              {
                buyer: function(callback) {
                  Buyer
                    .findOne({ company: payload["company"].id })
                    .exec(function(err, buyer) {
                      if (err) { callback(err, null); }
                      else if (!buyer) { callback(null, undefined); }
                      else {
                        buyer = waterlineHelper.fixBuyerArrays(buyer);
                        payload["buyer"] = buyer;
                        callback(null, buyer);
                      }
                    });
                },
                supplier: function(callback) {
                  Supplier
                    .findOne({ company: payload["company"].id })
                    .exec(function(err, supplier) {
                      if (err) { callback(err, null); }
                      else if (!supplier) { callback(null, undefined); }
                      else {
                        supplier = waterlineHelper.fixSupplierArrays(supplier);
                        payload["supplier"] = supplier;
                        callback(null, supplier);
                      }
                    });
                }
              },
              function(err, data) {
                if (payload["buyer"] !== undefined && payload["supplier"] === undefined) {
                  res.view({ user: payload["user"], company: payload["company"], buyer: payload["buyer"], supplier: payload["supplier"], companyLocations: viewLocations });
                }
                if (payload["buyer"] === undefined && payload["supplier"] !== undefined) {
                  res.view({ user: payload["user"], company: payload["company"], buyer: payload["buyer"], supplier: payload["supplier"], companyLocations: viewLocations });
                }
                if (payload["buyer"] !== undefined && payload["supplier"] !== undefined) {
                  res.view({ user: payload["user"], company: payload["company"], buyer: payload["buyer"], supplier: payload["supplier"], companyLocations: viewLocations });
                }
              }
            ) // End async
        });
      });
    });
  },

  updateBasicCompanyDetails: function(req, res) {
    var user = req.session.passport.user;
    var b = req.body;
    var companyID;
    var numOfLocations;

    User.findOne({ id: user }, function(err, user) {
      if (err) { /* do something here */ }
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { /* do something here */ }
        companyID = company.id;
        Company.update(companyID, {
          name: b.name,
          phoneNumberCountryCode: b.phoneNumberCountryCode,
          phoneNumber: b.phoneNumber,
          phoneExtension: b.phoneExtension,
          faxCountryCode: b.faxCountryCode,
          faxNumber: b.faxNumber,
          faxExtension: b.faxExtension,
          email: b.email,
          website: b.website,
          industry: b.companyIndustry,
          employeeCount: b.employeeCount
        }, function(err, newCompany) {
          if (err) { /* do something here */ }
          Location.find({ company: companyID}, function(err, locations) {
            numOfLocations = locations.length;

            if (b.companyIsHq == "on" && numOfLocations === 1) {
              Location.update(locations[0].id, {
                addressLine1: b.companyAddress1,
                addressLine2: b.companyAddress2,
                country: b.companyCountry,
                province: b.companyProvince,
                postalCode: b.companyPostalCode
              }).exec(function(err, newLocation){
                if (err) { /* do something here */ }
                return res.redirect('/company/update'); /* Success message? */
              });
            }

            if (b.companyIsHq == "on" && numOfLocations === 2) {
              var nonhq, hq;
              locations.forEach(function(location) {
                if (location.isHq === false) { nonhq = location; }
                if (location.isHq === true) { hq = location; }
              });

              Location.update(hq.id, {
                addressLine1: b.companyAddress1,
                addressLine2: b.companyAddress2,
                country: b.companyCountry,
                province: b.companyProvince,
                postalCode: b.companyPostalCode
              }).exec(function(err, updatedHq) {
                if (err) { /* do something here */ }
              });

              Location.destroy({ id: nonhq.id }).exec(function(err){
                if (err) { /* do something here */ }
              });

              return res.redirect('/company/update');
            }

            if (b.companyIsHq == undefined && numOfLocations === 1) {  //LOOK INTO THIS MORE

              Location.update(locations[0].id, {
                addressLine1: b.hqAddress1,
                addressLine2: b.hqAddress2,
                country: b.hqcompanyCountry,
                province: b.hqcompanyProvince,
                postalCode: b.hqPostalCode
              }).exec(function(err, updatedHQ) {
                if (err) { /* do something here */ }
              });

              Location.create({
                company: companyID,
                addressLine1: b.companyAddress1,
                addressLine2: b.companyAddress2,
                country: b.companyCountry,
                province: b.companyProvince,
                postalCode: b.companyPostalCode,
                isHq: false,
                type: "Other"
              }, function(err, newLocation) {
                if (err) { /* do something here */ }
              });

              return res.redirect('/company/update');
            }

            if (b.companyIsHq == undefined && numOfLocations === 2) {
              var nonhq, hq;
              locations.forEach(function(location) {
                if (location.isHq === false) { nonhq = location; }
                if (location.isHq === true) { hq = location; }
              });

              Location.update(nonhq.id, {
                addressLine1: b.companyAddress1,
                addressLine2: b.companyAddress2,
                country: b.companyCountry,
                province: b.companyProvince,
                postalCode: b.companyPostalCode
              }).exec(function(err, newNonHQ) {
                if (err) { /* do something here */ }
              });

              Location.update(hq.id, {
                addressLine1: b.hqAddress1,
                addressLine2: b.hqAddress2,
                country: b.hqcompanyCountry,
                province: b.hqcompanyProvince,
                postalCode: b.hqPostalCode
              }).exec(function(err, newHQ) {
                if (err) { /* do something here */ }
              });
              return res.redirect('/company/update'); /* Success message? */
            }
          });
        });
      });
    });


  },

  /*updateBasicCompanyDetails: function(req, res){
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
  },*/

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
