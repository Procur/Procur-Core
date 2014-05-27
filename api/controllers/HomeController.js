/**
 * HomeController
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
    var is_auth = req.session.authenticated;

    if(is_auth){
      res.redirect('/dashboard');
    }
    res.view();
  },


  //HEADER ACTIONS
  features: function(req, res){
    res.view();
  },

  pricing: function(req, res){
    res.view();
  },

  tradeShows: function(req, res){
    res.view();
  },

  aboutUs: function(req, res){
    res.view();
  },

  press: function(req, res){
    res.view();
  },

  careers: function(req, res){
    res.view();
  },

  contact: function(req, res){
    res.view();
  },

  faq: function(req, res){
    res.view();
  },

  contactSupport: function(req, res){
    res.view();
  },

  //FOOTER ACTIONS
  privacyNotice: function(req, res){
    res.view();
  },

  terms: function(req, res){
    res.view();
  }


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  //_config: {}


};
