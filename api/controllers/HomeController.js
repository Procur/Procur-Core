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

var nodemailer = require('nodemailer'),
    smtpTransport = nodemailer.createTransport("SMTP", {
      service: "Mandrill",
      auth: {
        user: process.env.MANDRILL_USERNAME || "app25459603@heroku.com",
        pass: process.env.MANDRILL_APIKEY || "_tko3ueulFUKJ4Grtv9cmQ"
      }
    }),
    address = process.env.ENVIRONMENT_URL || 'localhost:1337';


module.exports = {

  index: function(req, res){
    var is_auth = req.session.authenticated;
    if(req.session.passport.user){
      if(is_auth){
        res.redirect('/dashboard');
      }
      res.view();
    }
    else {
      if(is_auth){
        res.redirect('/logout');
      }
      else {
        res.view();
      }
    }

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

  earlyaccess: function(req, res){
  res.view();
  },

  press: function(req, res){
    res.view();
  },

  login: function(req, res){
  res.view();
  },

  signup: function(req, res){
  res.view();
  },

  careers: function(req, res){
    res.view();
  },

  //CONTACT FORM FUNCTIONALITY

  contact: function(req, res){
    res.view();
  },

  processContact: function(req, res){
    var b = req.body;
    var htmlContent = b.content;
    var mailOptions = {
      from: b.email,
      to: 'dev@procur.com',
      subject: "Contact form submission",
      generateTextFromHTML: true,
      html: htmlContent
    };

    smtpTransport.sendMail(mailOptions, function(err, response){
      if(err){res.serverError();}
      req.flash('success',"Message sent! We'll get back to you as soon as possible.");
      res.redirect('/contact');
    });
  },

  ////////////////////////////

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
  },

  termsofservice: function(req, res){
    res.view();
  }


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  //_config: {}


};
