/**
 * SupplierController
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

  index: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        Supplier.findOne({ company: company.id }, function(err, supplier){
            //TODO: Pass all supplier attributes to view.
            res.view();
        });
      });
    });
  },

  create: function(req, res) {
    var b = req.body;
    var image = req.files.logoUrl.path;
    var imageHelper = sails.config.imageUploadHelper;
    var imageExists = imageHelper.getFileSize(image);

    User.findOne({ id: req.session.passport.user }, function(err, user) {
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { return res.redirect('/dashboard'); }
        if (b.privateLabeler == "privateLabeler") { b.privateLabeler = true; } else { b.privateLabeler = false; }
        Supplier.findOne({ company: company.id }, function(err, supplier){
          if(err){ return res.redirect('/dashboard'); }
          if(supplier === undefined){
            Supplier.create({
              company  : company.id,
              dbaName : b.dba,
              language: [b.language],
              typeOfCompany : b.typeOfCompany,
              locationName: [b.supplierOtherLocationName],
              locationType: [b.supplierOtherLocationType],
              locationCountry: [b.supplierOtherLocationCountry],
              locationProvince: [b.supplierOtherLocationProvince],
              locationCity: [b.supplierOtherLocationCity],
              annualSalesValue: b.annualProductionVolume,
              privateLabeler: b.privateLabeler,
              acceptedCurrency: [b.acceptedCurrency],
              acceptedPaymentTerms: [b.acceptedPaymentTerms],
              preferredBuyerType: b.preferredBuyerType,
              preferredBuyerLocation: [b.preferredBuyerLocation],
              preferredBuyerLanguage: [b.preferredBuyerLanguage],
              productCategory: [b.autocomplete],
              active: true
            }, function(err, supplier) {
              if (err) { return res.redirect('/dashboard'); }
              if (imageExists) { imageHelper.uploadSupplierImage(req, res, supplier, image, function(){
                console.log('Redirecting to dashboard on supplier');
                res.redirect('/dashboard');
              }); }
              else{
                return res.redirect('/dashboard');
              }
            });
          }
          else {
            return res.redirect('/dashboard');
          }
        });
      });
    });
  },

  update: function(req, res){
    var b = req.body;
    var image = req.files.logoUrl.path;
    var imageHelper = sails.config.imageUploadHelper;
    var imageExists = imageHelper.getFileSize(image);
    var companyId;
    var hqId;

    User.findOne({ id: req.session.passport.user }, function(err, user) {
      if (err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company) {
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
        }, function(err, company) {
          if (err) { return res.redirect('/dashboard'); }
          Location.findOne({ company: companyId, isHq: true }, function(err, hqLocation) {
            if (err) { return res.redirect('/dashboard'); }
            hqId = hqLocation.id;
          });
          //Company only has HQ location
          if (b.companyIsHq === 'on') {
            Location.update(hqId, {
              addressLine1: b.hqAddress1,
              addressLine2: b.hqAddress2,
              province: b.hqProvince,
              country: b.hqCountry,
              postalCode: b.hqPostalCode
            }).exec(function(err, updatedHq) {
              if (err) { return res.redirect('/dashboard'); }
            });
          }
          //Update HQ and company address
          else {
            Location.findOne({ company: companyId, isHq: false }, function(err, compLocation) {
              if (err) { return res.redirect('/dashboard'); }
              Location.update(hqId, {
                addressLine1: b.hqAddress1,
                addressLine2: b.hqAddress2,
                province: b.hqProvince,
                country: b.hqCountry,
                postalCode: b.hqPostalCode
              }).exec(function(err, updatedHq) {
                if (err) { return res.redirect('/dashboard'); }
              });
              Location.update(compLocation.id, {
                addressLine1: b.companyAddress1,
                addressLine2: b.companyAddress2,
                province: b.companyProvince,
                country: b.companyCountry,
                postalCode: b.companyPostalCode
              }).exec(function(err, updatedLocation) {
                if (err) { return res.redirect('/dashboard'); }
              });
            });
          }

          Supplier.findOne({ company: companyId }, function(err, supplier) {
            if (err) { return res.redirect('/dashboard'); }
            if (imageExists) { imageHelper.uploadSupplierImage(req, res, supplier, image); }
            Supplier.update(supplier.id, {
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
              annualSalesValue: b.annualSalesValue,
              preferredBuyerType: b.preferredBuyerType,
              preferredBuyerLanguage: [b.preferredBuyerLanguage],
              preferredBuyerLocation: [b.preferredBuyerCountry],
              acceptedDeliveryTerms: [b.acceptedDeliveryTerms],
              acceptedCurrency: [b.acceptedCurrency],
              acceptedPaymentTerms: [b.acceptedPaymentTerms],
              typeOfCompany: b.typeOfCompany,
              privateLabeler: b.privateLabeler,
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
              productCategory: [b.autocomplete]
            }).exec(function(err, supplier) {
              if (err) { return res.redirect('/dashboard'); }
            });
          });
          return res.redirect('/dashboard');
        });
      });
    });
  },

  //EDIT COMPANY PROFILE - SUPPLIER ELEMENTS

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
            Supplier.findOne({ company: company.id }, function (err, supplier) {
              if(err){ return res.redirect('/dashboard'); }
              if(supplier !== undefined){
                if (imageExists) {
                  imageHelper.uploadSupplierImage(req, res, supplier, image, function(){
                    res.redirect('/company/update#supplierInformation');
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
        Supplier.findOne({ company: company.id }, function(err, supplier) {
          if (err) { /* do something here */ }
          if (supplier === undefined) { /* do something here */ }
          Supplier.update(supplier.id, {
            dbaName: b.dba,
            language: [b.language],
            acceptedCurrency: [b.acceptedCurrency],
            acceptedPaymentTerms: [b.acceptedPaymentTerms],
            acceptedDeliveryTerms: [b.acceptedDeliveryTerms],
            typeOfCompany: b.typeOfCompany,
            privateLabeler: b.privateLabeler,
            contactName: b.contactName,
            contactPosition: b.contactPosition,
            contactEmail: b.contactEmail,
            productCategory: [b.autocomplete],
            gsaApprovedSupplier: b.gsaApprovedSupplier,
            dunsNumber: b.dunsNumber,
            cageCode: b.cageCode
          }).exec(function(err, newSupplier) {
            if (err) { /* do something here */ }
            return res.redirect('/company/update#supplierInformation');
          });
        });
      });
    });
  },

  updateProductionDetails: function(req, res) {
    var user = req.session.passport.user;
    var b = req.body;

    User.findOne({ id: user }, function(err, user) {
      if (err) { /* do something here */ }
      if (user === undefined) { /* do something here */ }
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { /* do something here */ }
        if (company === undefined) { /* do something here */ }
        Supplier.findOne({ company: company.id }, function(err, supplier) {
          if (err) { /* do something here */ }
          if (supplier === undefined) { /* do something here */ }
          Supplier.update(supplier.id, {
            annualSalesValue: b.annualSalesValue,
            totalFactorySize: b.totalFactorySize,
            totalQCStaff: b.totalQCStaff,
            locationName: [b.locationName],
            locationType: [b.locationType],
            locationCountry: [b.locationCountry],
            locationProvince: [b.locationProvince],
            locationCity: [b.locationCity],
            portCity: b.portCity,
            portCountry: b.portCountry,
            portProvince: b.portProvince
          }).exec(function(err, newSupplier) {
            if (err) { /* do something here */ }
            return res.redirect('/company/update#productionDetails');
          });
        });
      });
    });
  },

  updateDescriptions: function (req, res) {
    var user = req.session.passport.user;
    var b = req.body;

    User.findOne({ id: user }, function(err, user) {
      if (err) { /* do something here */ }
      if (user === undefined) { /* do something here */ }
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { /* do something here */ }
        if (company === undefined) { /* do something here */ }
        Supplier.findOne({ company: company.id }, function(err, supplier) {
          if (err) { /* do something here */ }
          if (supplier === undefined) { /* do something here */ }
          Supplier.update(supplier.id, {
            companyDescription: b.companyDescription,
            environmentalSustainability: b.environmentalSustainability,
            qualitySourcing: b.qualitySourcing,
            workplaceSafety: b.workplaceSafety,
            laborEducationTraining: b.laborEducationTraining,
            reinvestment: b.reinvestment
          }).exec(function(err, newSupplier) {
            if (err) { /* do something here */ }
            return res.redirect('/company/update#descriptionsSupplier')
          });
        });
      });
    });

  },

  updatePreferences: function (req, res) {
    var user = req.session.passport.user;
    var b = req.body;
    User.findOne({ id: user }, function(err, user) {
      if (err) { /* do something here */ }
      if (user === undefined) { /* do something here */ }
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { /* do something here */ }
        if (company === undefined) { /* do something here */ }
        Supplier.findOne({ company: company.id }, function(err, supplier) {
          if (err) { /* do something here */ }
          if (supplier === undefined) { /* do something here */ }
          Supplier.update(supplier.id, {
            preferredBuyerType: b.preferredBuyerType,
            preferredBuyerLanguage: [b.preferredBuyerLanguage],
            preferredBuyerLocation: [b.preferredBuyerLocation]
          }).exec(function(err, newSupplier) {
            if (err) { /* do something here */ }
            return res.redirect('/company/update#preferencesSupplier')
          });
        });
      });
    });
  },

  updateSocialOutlets: function (req, res) {
    var user = req.session.passport.user;
    var b = req.body;
    User.findOne({ id: user }, function(err, user) {
      if (err) { /* do something here */ }
      if (user === undefined) { /* do something here */ }
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { /* do something here */ }
        if (company === undefined) { /* do something here */ }
        Supplier.findOne({ company: company.id }, function(err, supplier) {
          if (err) { /* do something here */ }
          if (supplier === undefined) { /* do something here */ }
          Supplier.update(supplier.id, {
            facebook: b.facebook,
            twitter: b.twitter,
            google: b.google,
            linkedin: b.linkedin,
            pinterest: b.pinterest,
            instagram: b.instagram,
            tumblr: b.tumblr
          }).exec(function(err, newSupplier) {
            if (err) { /* do something here */ }
            return res.redirect('/company/update#socialOutletsSupplier')
          });
        });
      });
    });
  },

  destroy: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        Supplier.findOne({ company: company.id }, function(err, supplier){
            if(err) { return res.redirect('/dashboard'); }
            Supplier.update(supplier, { active: false });
        });
      });
    });
  }

};
