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
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err){
           return res.send(err);
        }
        else {
          req.session.authenticated = true;
          res.redirect('/welcome');
        }
      });
    })(req, res);
  },

  //HANDLES REGISTRATION FORM DATA
  register: function(req, res){
    var b = req.body;

    User.findOne({ email: b.email}, function(err, user){
      if(err) {
        return res.send(err);
        console.log('err should be written')
      }
      if(!user){
        //CREATE USER
        User.create({
          firstName: b.firstName,
          lastName: b.lastName,
          email: b.email,
          password: b.password,
          emailVerified: false,
          profileComplete: false,
          active: true
        }, function(err, user){
          if(err){
            res.send(err);
          }
          else{
            //CREATE EMAIL VERIFICATION OBJECT AND TOKEN
            crypto.randomBytes(256, function(err, hash) {
              if(err) return err;
              token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
              console.log("TOKEN: " + token);
              EmailVerification.create({ email: b.email, token: token }, function(err, emailVerification){
                if(err) return err;
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
                  if (err){
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
          if(err) return res.redirect('/dashboard');
          emailAddress = user.email;
          User.update(user, { password: newPassword }, function(err, user){
            if(err) return res.redirect('/dashboard');

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
          PasswordReset.create({ user: user.id, token: hash }, function(err, reset){
            if(err){ return res.redirect('/dashboard') };
            var htmlContent = 'Click the link below to reset your password. <br /><a href="http://' + address + '/verify?token=' + reset.token;
            var mailOptions = {
              from: "support@procur.com",
              to: emailAddress,
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

  processPasswordResetLink: function(req, res){

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
        return res.send(err);
        console.log('err should be written')
      }
      else {
        res.view({ message: "signed out. "});
      }
    });
  },

  resendVerificationEmail: function(req, res){
    User.findOne(req.session.passport.user, function(err, user){
      if(err) res.redirect('/dashboard');
      EmailVerification.findOne({ email: user.email }, function(err, emailVerification){
        if(err) res.redirect('/dashboard');
        crypto.randomBytes(256, function(err, hash) {
          if(err) return err;
          token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
          console.log("TOKEN: " + token);
          EmailVerification.update(emailVerification, {token: token }, function(err, emailVerification){
            if(err) return err;
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

    if(!consumeToken) {
      res.redirect('/dashboard');
    }
    else {
      EmailVerification.findOne({ token: consumeToken }, function(err, verification){
        if(err) return err;
        User.findOne({ email: verification.email }, function(err, user){
          if(err) return err;
          User.update(user, { emailVerified: true }, function(err, toUpdate){
            if(err) return err;
            res.redirect('/dashboard');
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
