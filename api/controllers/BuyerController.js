/**
 * BuyerController
 *
 * @module      :: Controller
 * @description  :: A set of functions called `actions`.
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

  index: function (req, res) {
    User.findOne({ id: req.session.passport.user }, function (err, user) {
      if (err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function (err, company) {
        if (err) { return res.redirect('/dashboard'); }
        Buyer.findOne({ company: company.id }, function (err, buyer) {
          var b = buyer;
          res.view({
            company: b.company,
            dbaName: b.dba,
            logoUrl: b.logoUrl,
            language: b.language,
            preferredSupplierType: b.preferredSupplierType,
            preferredSupplierLanguage: b.preferredSupplierLanguage,
            preferredSupplierLocation: b.preferredSupplierLocation,
            typeOfCompany: b.typeOfCompany,
            acceptedDeliveryTerms: b.acceptedDeliveryTerms,
            acceptedCurrency: b.acceptedCurrency,
            acceptedPaymentTerms: b.acceptedPaymentTerms
          });
        });
      });
    });
  },

  create: function (req, res) {
    var b = req.body;
    var image = req.files.logoUrl.path;
    var imageHelper = sails.config.imageUploadHelper;
    var imageExists = imageHelper.getFileSize(image);

    User.findOne({ id: req.session.passport.user }, function (err, user) {
      Company.findOne({ user: user.id }, function (err, company) {
        if (err) { return res.redirect('/dashboard'); }
        Buyer.create({
          company: company.id,
          dbaName: b.dba,
          language: [b.language],
          preferredSupplierType: b.preferredSupplierType,
          preferredSupplierLanguage: [b.preferredSupplierLanguage],
          preferredSupplierLocation: [b.preferredSupplierLocation],
          typeOfCompany: b.typeOfCompany,
          acceptedCurrency: [b.acceptedCurrency],
          acceptedPaymentTerms: [b.acceptedPaymentTerms],
          locationName: [b.buyerOtherLocationName],
          locationType: [b.buyerOtherLocationType],
          locationCountry: [b.buyerOtherLocationCountry],
          locationProvince: [b.buyerOtherLocationProvince],
          locationCity: [b.buyerOtherLocationCity],
          productCategory: [b.autocomplete],
          active: true
        }, function (err, buyer) {
          if (err) { return res.redirect('/dashboard'); }
          if (imageExists) {
            imageHelper.uploadBuyerImage(req, res, buyer, image, function(){
              res.redirect('/dashboard');
            });
          }
        });
      });
    });
  },

  update: function (req, res) {
    var b = req.body;
    var image = req.files.logoUrl.path;
    var imageHelper = sails.config.imageUploadHelper;
    var imageExists = imageHelper.getFileSize(image);
    var companyId;
    var hqId;

    User.findOne({ id: req.session.passport.user }, function (err, user) {
      if (err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function (err, company) {
        if (err) { return res.redirect('/dashboard'); }
        companyId = company.id;
        Company.update(company.id, {
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
          employeeCount: b.employeeCount,
          handle: b.companyUrl
        }, function (err, company) {
          if (err) { return res.redirect('/dashboard'); }
          Location.findOne({ company: companyId, isHq: true }, function (err, hqLocation) {
            if (err) { return res.redirect('/dashboard'); }
            hqId = hqLocation.id;
          });
          if (b.companyIsHq === 'on') {
            Location.update(hqId, {
              addressLine1: b.hqAddress1,
              addressLine2: b.hqAddress2,
              province: b.hqProvince,
              country: b.hqCountry,
              postalCode: b.hqPostalCode
            }).exec(function (err, updatedHq) {
              if (err) { return res.redirect('/dashboard'); }
            });
          }
          else {
            Location.findOne({ company: companyId, isHq: false }, function (err, compLocation) {
              if (err) { return res.redirect('/dashboard'); }
              Location.update(hqId, {
                addressLine1: b.hqAddress1,
                addressLine2: b.hqAddress2,
                province: b.hqProvince,
                country: b.hqCountry,
                postalCode: b.hqPostalCode
              }).exec(function (err, updatedHq) {
                if (err) { return res.redirect('/dashboard'); }
              });
              Location.update(compLocation.id, {
                addressLine1: b.companyAddress1,
                addressLine2: b.companyAddress2,
                province: b.companyProvince,
                country: b.companyCountry,
                postalCode: b.companyPostalCode
              }).exec(function (err, updatedLocation) {
                if (err) { return res.redirect('/dashboard'); }
              });
            });
          }

          Buyer.findOne({ company: companyId }, function (err, buyer) {
            if (err) { return res.redirect('/dashboard'); }
            if (imageExists) {
              imageHelper.uploadBuyerImage(req, res, supplier, image);
            }
            Buyer.update(buyer.id, {
              dbaName: b.dbaName,
              language: [b.language],
              locationName: [b.locationName],
              locationType: [b.locationType],
              locationCity: [b.locationCity],
              locationProvince: [b.locationProvince],
              locationCountry: [b.locationCountry],
              portCity: b.nearestPortCity,
              portProvince: b.nearestPortProvince,
              portCountry: b.nearestPortCountry,
              preferredSupplierType: [b.preferredSupplierType],
              preferredSupplierLanguage: [b.preferredSupplierLanguage],
              preferredSupplierLocation: [b.preferredSupplierCountry],
              typeOfCompany: b.typeOfCompany,
              acceptedDeliveryTerms: [b.acceptedDeliveryTerms],
              acceptedCurrency: [b.acceptedCurrency],
              acceptedPaymentTerms: [b.acceptedPaymentTerms],
              facebook: b.facebook,
              twitter: b.twitter,
              pinterest: b.pinterest,
              tumblr: b.tumblr,
              linkedin: b.linkedin,
              instagram: b.instagram,
              google: b.google,
              dunsNumber: b.dunsNumber,
              contactName: b.contactName,
              contactPosition: b.contactPosition,
              contactEmail: b.contactEmail,
              companyDescription: b.companyDescription,
              environmentalSustainability: b.environmentalSustainability,
              qualitySourcing: b.qualitySourcing,
              workplaceSafety: b.workplaceSafety,
              laborEducationTraining: b.laborEducationTraining,
              reinvestment: b.reinvestment,
              productsOfInterest: b.productsOfInterest,
              productCategory: [b.autocomplete]
            }, function (err, buyer) {
              if (err) { return res.redirect('/dashboard'); }
              return res.redirect('/company/update');
            });
          });
        });
      });
    });

  },

  //EDIT COMPANY PROFILE - BUYER ELEMENTS

  updateLogo: function (req, res) {
    var image = req.files.logo.path;
    var imageHelper = sails.config.imageUploadHelper;
    var imageExists = imageHelper.getFileSize(image);
    var activeUser = req.session.passport.user;

    User.findOne({ id: activeUser }, function (err, user) {
      if (err) { return res.redirect('/dashboard'); }
      if (user !== undefined) {
        Company.findOne({ user: user.id }, function (err, company) {
          if (err) { return res.redirect('/dashboard'); }
          if (company !== undefined) {
            Buyer.findOne({ company: company.id }, function (err, buyer) {
              if(err){ return res.redirect('/dashboard'); }
              if(buyer !== undefined){
                if (imageExists) {
                  imageHelper.uploadBuyerImage(req, res, buyer, image, function(){
                    res.redirect('/company/update#buyerInformation');
                  });
                }
              }
              else{
                return res.redirect('/dashboard');
              }

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
  },

  updateInformation: function (req, res) {
    var user = req.session.passport.user;
    var b = req.body;

    b.privateLabeler === "privateLabeler" ? b.privateLabeler = true : b.privateLabeler = false;
    b.gsaApprovedSupplier === "gsaApprovedSupplier" ? b.gsaApprovedSupplier = true : b.gsaApprovedSupplier = false;

    User.findOne({ id: user }, function(err, user) {
      if (err) { /* do something here */ }
      if (user === undefined) { /* do something here */ }
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { /* do something here */ }
        if (company === undefined) { /* do something here */ }
        Buyer.findOne({ company: company.id }, function(err, buyer) {
          if (err) { /* do something here */ }
          if (buyer === undefined) { /* do something here */ }
          Buyer.update(buyer.id, { 
            dbaName: b.dbaName,
            language: [b.language],
            acceptedCurrency: [b.acceptedCurrency],
            acceptedPaymentTerms: [b.acceptedPaymentTerms],
            acceptedDeliveryTerms: [b.acceptedDeliveryTerms],
            typeOfCompany: b.typeOfCompany,
            contactName: b.contactName,
            contactPosition: b.contactPosition,
            contactEmail: b.contactEmail,
            dunsNumber: b.dunsNumber,
            productCategory: [b.autocomplete],
            locationName: [b.locationName],
            locationType: [b.locationType],
            locationCountry: [b.locationCountry],
            locationProvince: [b.locationProvince],
            locationCity: [b.locationCity],
            portCity: b.portCity,
            portCountry: b.portCountry,
            portProvince: b.portProvince
          }).exec(function(err, newBuyer) {
            if (err) { /* do something here */ }
            return res.redirect('/company/update#buyerInformation');
          });
        });
      });
    });
  },

  updateDescriptions: function (req, res) {
    var activeUser = req.session.passport.user,
        p = req.body;
    User.findOne({ id: activeUser }, function(err, user){
      if(err){ return res.redirect('/dashboard'); }
      if(user !== undefined){
        Company.findOne({ user: user.id }, function(err, company){
          if(err){ return res.redirect('/dashboard'); }
          if(company !== undefined){
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){ return res.redirect('/dashboard'); }
              if(buyer !== undefined){
                Buyer.update(buyer.id, {
                  companyDescription: p.companyDescription,
                  environmentalSustainability: p.environmentalSustainability,
                  qualitySourcing: p.qualitySourcing,
                  workplaceSafety: p.workplaceSafety,
                  laborEducationTraining: p.laborEducationTraining,
                  reinvestment: p.reinvestment
                }, function(err, buyer){
                  if(err){ return res.redirect('/company/update#descriptionsSupplier'); }
                  if(buyer){
                    return "success";
                  }
                  else {
                    return "failed"
                  }
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
      else{
        return res.redirect('/dashboard');
      }
    });
  },

  updatePreferences: function (req, res) {
    var activeUser = req.session.passport.user,
        p = req.body,
        supplierLanguage = [p.preferredSupplierLanguage],
        supplierLocation = [p.preferredSupplierLocation];
    User.findOne({ id: activeUser }, function(err, user){
      if(err){ return res.redirect('/dashboard'); }
      if(user !== undefined){
        Company.findOne({ user: user.id }, function(err, company){
          if(err){ return res.redirect('/dashboard'); }
          if(company !== undefined){
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){ return res.redirect('/dashboard'); }
              if(buyer !== undefined){
                Buyer.update(buyer.id, {
                  preferredSupplierType: p.preferredSupplierType,
                  preferredSupplierLanguage: supplierLanguage,
                  preferredSupplierLocation: supplierLocation
                }, function(err, buyer){
                  if(err){} //return res.redirect('/company/update#descriptionsSupplier'); }
                  if(buyer){
                    return "success";
                  }
                  else {
                    return "failed"
                  }
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
      else{
        return res.redirect('/dashboard');
      }
    });
  },

  updateSocialOutlets: function (req, res) {
    var activeUser = req.session.passport.user,
        p = req.body;
    User.findOne({ id: activeUser }, function(err, user){
      if(err){ return res.redirect('/dashboard'); }
      if(user !== undefined){
        Company.findOne({ user: user.id }, function(err, company){
          if(err){ return res.redirect('/dashboard'); }
          if(company !== undefined){
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){ return res.redirect('/dashboard'); }
              if(buyer !== undefined){
                Buyer.update(buyer.id, {
                  facebook: p.facebook,
                  twitter: p.twitter,
                  google: p.google,
                  linkedin: p.linkedin,
                  pinterest: p.pinterest,
                  instagram: p.instagram,
                  tumblr: p.tumblr
                }, function(err, buyer){
                  if(err){ return res.redirect('/company/update#socialOutletsBuyer') }
                  if(buyer){
                    return res.send('success');
                  }
                  else{
                    return res.send('failed');
                  }
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
      else{
        return res.redirect('/dashboard');
      }
    });
  },

  destroy: function (req, res) {
    var activeUser = req.session.passport.user,
        p = req.params;
  },

  test: function(req, res){
    var locationsHelper = sails.config.locationsHelper;
    var myLocations = [];
    User.findOne({ id: req.session.passport.user }, function(err, user){
      Company.findOne({ user: user.id }, function(err, company){
        Buyer.findOne({ company: company.id }, function(err, buyer){
          Location.find().where({ company: company.id }).exec(function(err, locations){
            myLocations["company"] = locations;
            var myNewLocations = locationsHelper.parseLocations(myLocations);
          });
        });
      });
    });

  }

};
