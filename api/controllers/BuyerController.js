/**
 * BuyerController
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
      if (err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if (err) { return res.redirect('/dashboard'); }
        Buyer.findOne({ company: company.id }, function(err, buyer){
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

  create: function(req, res) {
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user) {
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { return res.redirect('/dashboard'); }
        Buyer.create({
          company: company.id,
          dbaName: b.dba,
          logoUrl: b.logoUrl,
          language: [b.language1, b.language2],
          preferredSupplierType: b.preferredSupplierType,
          preferredSupplierLanguage: [b.preferredSupplierLanguage1,
                                      b.prefferedSupplierLanguage2,
                                      b.prefferedSupplierLanguage3],
          preferredSupplierLocation: [b.preferredSupplierLocation1Country,
                                      b.preferredSupplierLocation2Country,
                                      b.preferredSupplierLocation3Country],
          typeOfCompany: b.typeOfCompany,
          acceptedDeliveryTerms: b.acceptedDeliveryTerms,
          acceptedCurrency: b.acceptedCurrency,
          acceptedPaymentTerms: b.acceptedPaymentTerms,
          active: true
        }, function(err, buyer) {
          if (err) { return res.redirect('/dashboard'); }
          console.log("AM - Buyer created " + buyer.dbaName);
          Location.create({
            company: company.id,
            title: b.otherLocation1Name,
            type: b.type,
            city: b.city,
            province: b.province,
            country: b.country
          }, function(err, location) {
            if (err) { return res.redirect('/dashboard'); }
            console.log("AM - Location created " + location.title);
            Location.create({
              company: company.id,
              type: 'port',
              city: b.nearestPortCity,
              province: b.nearestPortProvince,
              country: b.nearestPortCountry
            }, function(err, location) {
              if (err) { return res.rediret('/dashboard'); }
              console.log("AM - Port location created " + location.city);
              res.redirect('/dashboard');              
            });
          });
        });
      });
    });
  },

  update: function(req, res){

  },

  destroy: function(req, res){

  }

};
