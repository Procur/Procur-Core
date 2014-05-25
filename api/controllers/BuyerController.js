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
      if (err) return res.redirect('/dashboard');
      Company.findOne({ user: user.id }, function(err, company){
        if (err) return res.redirect('/dashboard');
        Buyer.findOne({ company: company.id }, function(err, buyer){
          var b = buyer;
          res.view({
            company: b.comany,
            preferredSupplierType: b.preferredSupplierType,
            productCategories: b.productCategories,
            productsOfInterest: b.productsOfInterest,
            facebookUsername: b.facebookUsername,
            twitterUsername: b.twitterUsername,
            pintrestUsername: b.pintrestUsername,
            tumblrUsername: b.tumblrUsername,
            linkedinUsername: b.linkedinUsername,
            instagramUsername: b.instagramUsername,
            googleUsername: b.googleUsername,
            relevantLinksTitle: b.relevantLinksTitle,
            languages: b.languages,
            dunsNumber: b.dunsNumber,
            contactName: b.contactName,
            contactPosition: b.contactPosition
          });
        });
      });
    });
  },

  create: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user){
      Company.findOne({ user: user.id }, function(err, company){
        if (err) return res.redirect('/dashboard');
        Buyer.create({
          company: company.id,
          preferredSupplierType: b.preferredSupplierType,
          productCategories: b.productCategories,
          productsOfInterest: b.productsOfInterest,
          facebookUsername: b.facebookUsername,
          twitterUsername: b.twitterUsername,
          pintrestUsername: b.pintrestUsername,
          tumblrUsername: b.tumblrUsername,
          linkedinUsername: b.linkedinUsername,
          instagramUsername: b.instagramUsername,
          googleUsername: b.googleUsername,
          relevantLinksTitle: b.relevantLinksTitle,
          languages: b.languages,
          dunsNumber: b.dunsNumber,
          contactName: b.contactName,
          contactPosition: b.contactPosition
        }, function(err, buyer){
          if (err){
            var message = "There was a problem."
            return res.redirect('/dashboard', { message: message });
          }
          else {
            console.log('Buyer created: ' + buyer.company);
            res.redirect('/dashboard');
          }
        });
      });
    });
  },

  update: function(req, res){

  },

  destroy: function(req, res){

  }

};
