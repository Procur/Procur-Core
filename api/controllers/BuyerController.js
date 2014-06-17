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
    var image = req.files.logoUrl.path;
    var imageHelper = sails.config.imageUploadHelper;
    var imageExists = imageHelper.getFileSize(image);

    User.findOne({ id: req.session.passport.user }, function(err, user) {
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { return res.redirect('/dashboard'); }
        Buyer.create({
          company: company.id,
          dbaName: b.dba,
          language: [b.language],
          preferredSupplierType: b.preferredSupplierType,
          preferredSupplierLanguage: [b.preferredSupplierLanguage],
          preferredSupplierLocation: [b.preferredSupplierLocation],
          typeOfCompany: b.typeOfCompany,
          acceptedDeliveryTerms: [b.acceptedDeliveryTerms],
          acceptedCurrency: [b.acceptedCurrency],
          acceptedPaymentTerms: [b.acceptedPaymentTerms],
          portCity: b.portCity,
          portProvince: b.portProvince,
          portCountry: b.portCountry,
          locationName: [b.locationName],
          locationType: [b.locationType],
          locationCountry: [b.locationCountry],
          locationProvince: [b.locationProvince],
          locationCity: [b.locationCity],
          active: true
        }, function(err, buyer) {
          if (err) { return res.redirect('/dashboard'); }
          if (imageExists) { imageHelper.uploadBuyerImage(req, res, buyer, image); }
        });
        res.redirect('/dashboard');
      });
    });
  },

  update: function(req, res){
    console.log("You're in BuyerController#update");
  },

  destroy: function(req, res){

  }

};
