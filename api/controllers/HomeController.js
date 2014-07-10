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

function MailChimpConfig () {
  this.apikey = process.env.MAILCHIMP_APIKEY || 'eb531267a844e3881e4b16d8482ed998-us3';
  this.apiurl = process.env.MAILCHIMP_APIURL || 'us3.api.mailchimp.com';
  if (sails.config.environment == 'development'){
    this.listid1 = "58856a57f6"; //Procur.com Changes and Updates -  Dev
    this.listid2 = "f24155909b"; //Trade & Industry Newsletter - Dev
    this.listid3 = "152b1cd8d5"; //General News & Announcements - Dev
  }
  else if (process.env.NODE_ENV != 'development'){
    this.listid1 = "3a428c0b74"; //Procur.com Changes and Updates
    this.listid2 = "d96c07d54f"; //Trade & Industry Newsletter
    this.listid3 = "5ab736fb54"; //General News & Announcements
  }
}

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

  subscribe: function(req, res){
    var mcConfig = new MailChimpConfig();
    var b = req.body;
    var email = b.subscriberEmail;
    if(!email){
      req.flash('status',"Email address is blank.");
      res.redirect('/contact');
    }
    else if (email) {
      var subscribeToList = function (email, listId) {
        var request = require('request');
        var subscriber = {
          "apikey": mcConfig.apikey,
          "email": {"email": email},
          "id": listId
        };
        var subscriberString = JSON.stringify(subscriber);
        var options = {
          url: 'https://' + mcConfig.apiurl + '/2.0/lists/subscribe.json',
          body: subscriberString,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': subscriberString.length
          }
        };
        request.post(options, function(error, response, body){
          if (!error && response.statusCode == 200) {
          }
          else if (error || response.statusCode != 200) {
          }
        });
      };
      if (b.chkList1 != undefined) { subscribeToList(email, mcConfig.listid1); }
      if (b.chkList2 != undefined) { subscribeToList(email, mcConfig.listid2); }
      if (b.chkList3 != undefined) { subscribeToList(email, mcConfig.listid3); }
      req.flash('status', "Thank you! Please check your inbox for confirmation.");
      res.redirect('/contact');
    }
  },

  ////////////////////////////

  faq: function(req, res){
    res.view();
  },

  support: function(req, res){
    res.view();
  },

  //FOOTER ACTIONS
  privacyNotice: function(req, res){
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
