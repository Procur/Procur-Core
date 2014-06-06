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

  create: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      console.log(user);
      Company.findOne({ user: user.id }, function(err, company){
        if (err) { return res.redirect('/dashboard'); }
        console.log(company);
        Supplier.create({
          company: company.id,
          dbaName: b.dbaName,
          companyLogo: b.companyLogo,
          language: [b.language1, b.language2],
          annualProductionVolume: b.annualProductionVolume,
          primaryProductSpeciality: [b.primaryProductSpeciality1, b.primaryProductSpeciality2],
          preferredBuyerType: b.preferredBuyerType,
          preferredBuyerLanguage: [b.preferredBuyerLanguage1,
                                   b.preferredBuyerLanguage2,
                                   b.preferredBuyerLanguage3],
          preferredBuyerCountry: [b.preferredBuyerLocation1Country,
                                  b.preferredBuyerLocation2Country,
                                  b.preferredBuyerLocation3Country],
          acceptedDeliveryTerms: b.acceptedDeliveryTerms,
          acceptedCurrencies: b.acceptedCurrencies,
          acceptedPaymentTerms: b.acceptedPaymentTerms,
          typeOfCompany: b.typeOfCompany,
          privateLabeler: b.privateLabeler,
          active: true
        }, function(err, supplier){
          if (err){
            res.send(err);
            var message = "There was a problem."
            //res.redirect('/dashboard', { message: message });
          }
          console.log('Supplier created: ' + supplier.company);
          Location.create({
            company: company.id,
            title: b.otherLocation1Name,
            type: b.type,
            city: b.city,
            province: b.province,
            country: b.country,
            isHq: false
          }, function(err, location) {
            if (err) {
              var message = "There was a problem."
              console.log("error is " + JSON.stringify(err));
              res.redirect('/dashboard', { message: message });
            }
            Location.create({
              company: company.id,
              title: b.otherLocation1Name,
              type: 'port',
              city: b.portCity,
              province: b.portProvince,
              country: b.portCountry,
              isHq: false
            }, function(err, location) {
              console.log("New location is: " + JSON.stringify(location));
              if (err) {
                var message = "There was a problem."
                res.redirect('/dashboard', { message: message });
              }
            });
          res.redirect('/dashboard');
          });
        });
      });
    });
  },

  update: function(req, res){

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
