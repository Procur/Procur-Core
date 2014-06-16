/**
 * AuthController
 *
 */
var passport = require('passport'),
    nodemailer = require('nodemailer'),
    mandrill = require('./modules/mandrillConfig.js'),
    smtpTransport = nodemailer.createTransport("SMTP", {
      service: "Mandrill",
      auth: {
        user: mandrill.username,
        pass: mandrill.pass
      }
    }),
    address = '127.0.0.1:1337',
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    token;

module.exports = {

    //PROCESSES LOGIN REQUESTS
    process: function(req, res){
      passport.authenticate('local', function(err, user, info) {
        if ((err) || (!user)) {
          return res.send({
          message: 'login failed'
          });
        //return res.redirect('/dashboard');
        }
        req.logIn(user, function(err) {
          if (err) { return res.redirect('/dashboard'); }
          else {
            req.session.authenticated = true;
            console.log(req);
            console.log(req.session);
            console.log('THIS IS WHERE WE ARE FFS');
            res.redirect('/welcome');
          }
        });
      })(req, res);
  },

  //HANDLES REGISTRATION FORM DATA
  register: function(req, res){
    var b = req.body;

    User.findOne({ email: b.email}, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      if(!user){
        //CREATE USER
        User.create({
          firstName: b.firstName,
          lastName: b.lastName,
          email: b.email,
          password: b.password,
          emailVerified: false,
          profileComplete: false,
          active: true,
        }, function(err, user){
          if(err){ return res.redirect('/dashboard'); }
          else{
            //CREATE EMAIL VERIFICATION OBJECT AND TOKEN
            crypto.randomBytes(256, function(err, hash) {
              if(err) { return res.redirect('/dashboard'); }
              token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
              console.log("TOKEN: " + token);
              EmailVerification.create({ email: b.email, token: token }, function(err, emailVerification){
                if(err) { return redirect('/dashboard'); }
                console.log("Verification created: " + emailVerification);
              });

              //USER CREATED///////////
              /////////////////////////
              //SEND VERIFICATION EMAIL
              var htmlContent = '<a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';
              var mailOptions = {
                from: "welcome@procur.com",
                to: user.email,
                subject: "Please verify your Procur account!",
                generateTextFromHTML: true,
                html: htmlContent
              };

              smtpTransport.sendMail(mailOptions, function(err, response){
                if(err){
                  console.log(err);
                }
                else {
                  console.log("Verification email sent: " + response.message);
                }
              });
              //NOW AUTHENTICATE USER
              console.log("User: " + b.email + " created.");
              passport.authenticate('local', function(err, user, info) {
                if ((err) || (!user)) {
                  return res.send({
                  message: 'login failed'
                  });
                }
                req.logIn(user, function(err) {
                  if (err) {
                    res.send(err);
                  }
                  else {
                    req.session.authenticated = true;
                    res.redirect('/welcome');
                  }
                });
              })(req, res);
            });

          }
        })//END OF USER.CREATE
      }
      else {
        res.send({message: 'Email address is unavailable.'});
      }
    });
  },

  processChangePassword: function(req, res){
    var b = req.body;
    var newPassword;
    var emailAddress;
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(b.password, salt, function(err, hash){
        newPassword = hash;
        User.findOne({ id: req.session.passport.user }, function(err, user){
          if(err) { return res.redirect('/dashboard'); }
          emailAddress = user.email;
          User.update(user, { password: newPassword }, function(err, user){
            if(err) { return res.redirect('/dashboard'); }

            var htmlContent = 'Your procur password has been changed. Please contact support if you did not authorize this change.';
            var mailOptions = {
              from: "support@procur.com",
              to: emailAddress,
              subject: "Your Procur password has been changed",
              generateTextFromHTML: true,
              html: htmlContent
            };

            smtpTransport.sendMail(mailOptions, function(err, response){
              if(err){
                console.log(err);
              }
              else {
                console.log("Change Password email sent: " + response.message);
              }
            });
            req.flash('Password changed.');
            res.redirect('/dashboard');
          });
        });
      });
    });
  },

  forgotPassword: function(req, res){
    res.view();
  },

  processForgotPassword: function(req, res){
    var b = req.body;
    User.findOne({ email: b.email }, function(err, user){
      if(err){ return res.redirect('/dashboard') };
      if(user){
        crypto.randomBytes(256, function(err, hash) {
          token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
          PasswordReset.create({ user: user.id, token: token, consumed: false }, function(err, reset){
            if(err){ return res.redirect('/dashboard') };
            var htmlContent = 'Click the link below to reset your password. <br /><a href="http://' + address + '/resetpassword?token=' + reset.token + '">Here</a>';
            var mailOptions = {
              from: "support@procur.com",
              to: user.email,
              subject: "Procur Password Assistance",
              generateTextFromHTML: true,
              html: htmlContent
            };
            smtpTransport.sendMail(mailOptions, function(err, response){
              if(err){
                console.log(err);
              }
              else {
                console.log("Change Password email sent: " + response.message);
                res.redirect('/resetpassword/confirm');
              };
            });
          });
        });
      }
      else {
        req.flash('User not found.');
        res.redirect('/forgotpassword');
      }
    });
  },

  resetRequestMade: function(req, res){
    res.view();
  },

  selectNewPassword: function(req, res){
    var consumeToken = req.query.token;
    PasswordReset.findOne({ token: consumeToken, consumed: false }, function(err, reset){
      if(err){ return res.redirect('/dashboard') };
      if(reset){
        if(reset.consumed != true) {
          req.session.token = consumeToken;
          res.view();
        }
        else{
          res.redirect('/forgotpassword');
        }
      }
      else {
        res.redirect('/');
      }
    });
  },

  processSelectNewPassword: function(req, res){
    var b = req.body;
    var newPassword;
    var consumeToken = req.session.token;
    PasswordReset.findOne({ token: consumeToken }, function(err, reset){
      if(err){ return res.redirect('/dashboard') };
      if(reset){
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(b.password, salt, function(err, hash){
            newPassword = hash;
            User.findOne({ id: reset.user }, function(err, user){
              if(err){ return res.redirect('/dashboard') };
              if(user){
                User.update(user, { password: newPassword }, function(err, user){
                  if(err){ return res.redirect('/dashboard') };
                  PasswordReset.update(reset, { consumed: true }, function(err, reset){
                    if(err){ return res.redirect('/dashboard') };
                    if(reset.consumed == true){
                      req.flash('Password changed. Please log in.');
                      res.redirect('/');
                    }
                    else{
                      res.redirect('/dashboard');
                    }
                  })
                });
              }
              else {
                res.redirect('/dashboard');
              }
            });
          });
        });
      }
      else{
        res.redirect('/dashboard');
      }
    });
  },

  //KILLS SESSIONS AND REDIRECTS TO LOGOUT CONFIRMATION VIEW (GOODBYE)
  logout: function (req,res){
    req.session.authenticated = false;
    req.logout();
    res.redirect('/goodbye');
  },

  //LOGOUT CONFIRMATION
  goodbye: function(req, res){
    var user = req.session.user;
    User.findOne({ id: req.session.user }, function(err, user){
      if(err) {
        return res.redirect('/dashboard');
        console.log('err should be written');
      }
      else {
        res.view({ message: "signed out. "});
      }
    });
  },

  resendVerificationEmail: function(req, res){
    User.findOne(req.session.passport.user, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      EmailVerification.findOne({ email: user.email }, function(err, emailVerification){
        if(err) { return res.redirect('/dashboard'); }
        crypto.randomBytes(256, function(err, hash) {
          if(err) { return res.redirect('/dashboard'); }
          token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
          console.log("TOKEN: " + token);
          EmailVerification.update(emailVerification, {token: token }, function(err, emailVerification){
            if(err) { return res.redirect('/dashboard'); }
            console.log("Verification created: " + emailVerification);
            var htmlContent = '<a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';
            var mailOptions = {
              from: "welcome@procur.com",
              to: user.email,
              subject: "Please verify your Procur account!",
              generateTextFromHTML: true,
              html: htmlContent
            };

            smtpTransport.sendMail(mailOptions, function(err, response){
              if(err){
                console.log(err);
              }
              else {
                console.log("Verification email sent: " + response.message);
              }
            });
          });
        });
      });
    });
  },

  verifyEmail: function(req, res) {
    var consumeToken = req.query.token;

    if(!consumeToken) { return res.redirect('/dashboard'); }
    else {
      EmailVerification.findOne({ token: consumeToken }, function(err, verification){
        if(err) { return res.redirect('/dashboard'); }
        User.findOne({ email: verification.email }, function(err, user){
          if(err) { return res.redirect('/dashboard'); }
          User.update(user, { emailVerified: true }, function(err, toUpdate){
            if(err) { return res.redirect('/dashboard'); }
            return res.redirect('/dashboard');
          });
        });
      });
    };

  },

  //DEBUG VIEW - CONTAINS DEVELOPMENT UTILITY TOOLS
  test: function(req, res){
    console.log(req.session.authenticated);
    console.log(req.session);
    res.view();
  }
};

/**
 * Sails controllers expose some logic automatically via blueprints.
 *
 * Blueprints are enabled for all controllers by default, and they can be turned on or off
 * app-wide in `config/controllers.js`. The settings below are overrides provided specifically
 * for AuthController.
 *
 * NOTE:
 * REST and CRUD shortcut blueprints are only enabled if a matching model file
 * (`models/Auth.js`) exists.
 *
 * NOTE:
 * You may also override the logic and leave the routes intact by creating your own
 * custom middleware for AuthController's `find`, `create`, `update`, and/or
 * `destroy` actions.
 */

module.exports.blueprints = {

  // Expose a route for every method,
  // e.g.
  // `/auth/foo` =&gt; `foo: function (req, res) {}`
  actions: true,

  // Expose a RESTful API, e.g.
  // `post /auth` =&gt; `create: function (req, res) {}`
  rest: true,

  // Expose simple CRUD shortcuts, e.g.
  // `/auth/create` =&gt; `create: function (req, res) {}`
  // (useful for prototyping)
  shortcuts: true

};
