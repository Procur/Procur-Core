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
        user: process.env.MANDRILL_USERNAME || "app25459603@heroku.com",
        pass: process.env.MANDRILL_APIKEY || "_tko3ueulFUKJ4Grtv9cmQ"
      }
    }),
    address = process.env.ENVIRONMENT_URL || 'localhost:1337',
    crypto = require('crypto'),
    bcrypt = require('bcrypt'),
    token;

module.exports = {

    //PROCESSES LOGIN REQUESTS
    process: function(req, res){
      passport.authenticate('local', function(err, user, info) {
        if ((err) || (!user)) {
          req.flash('error', "The username or password you entered is incorrect. Please try again.");
          return res.redirect('/login');
        }
        req.logIn(user, function(err) {
          if (err) { return res.redirect('/dashboard'); }
          else {
            req.session.authenticated = true;
            res.redirect('/dashboard');
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
          active: true
        }, function(err, user){
          if(err){ return res.redirect('/dashboard'); }
          else{
            //CREATE EMAIL VERIFICATION OBJECT AND TOKEN
            crypto.randomBytes(256, function(err, hash) {
              if(err) { return res.redirect('/dashboard'); }
              token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
              EmailVerification.create({ email: b.email, token: token }, function(err, emailVerification){
                if(err) {return res.redirect('/dashboard'); }
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
                if(err){res.serverError();}
              });
              //NOW AUTHENTICATE USER
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
        }); //END OF USER.CREATE
      }
      else {
        req.flash('error', "There is already an account associated with "+ b.email +". Would you like to sign in?");
        res.redirect('back');
        //res.redirect('/login'); //<-- toggle this for proof that the flash just doesn't show up on '/' & '/signup'
      }
    });
  },

  processChangePassword: function(req, res){
    var b = req.body;
    var newPassword;
    var emailAddress;
    if((b.password !== undefined) && (b.password !== "")){
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
                if(err){}
                req.flash('message', 'Password changed.');
                res.redirect('back');
              });
            });
          });
        });
      });
    }
    else {
      //req.flash('message', 'You must enter a new password to change your current one');
      res.redirect('/user/update')
    }
  },

  forgotPassword: function(req, res){
    res.view();
  },

  processForgotPassword: function(req, res){
    var b = req.body;
    User.findOne({ email: b.email }, function(err, user){
      if(user === undefined) {
        req.flash("error", "The email address you entered cannot be found.");
        return res.redirect('/forgotpassword');
      }
      if(user){
        crypto.randomBytes(256, function(err, hash) {
          token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
          PasswordReset.findOne({ user: user.id }, function(err, reset){
            if(err){ return res.redirect('/'); }
            if(reset){
              PasswordReset.update(reset, { consumed: true }, function(err, reset){
                if(err){ return res.redirect('/'); }
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
                    if(err){res.serverError();}
                    req.flash('message', 'Password reset request sent.');
                    res.redirect('/forgotpassword');
                  });
                });
              });
            }
            else {
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
                  if(err){res.serverError();}
                  req.flash('message', 'Password reset request sent.');
                  res.redirect('/forgotpassword');
                });
              });
            }
          });
        });
      }
      else {
        //req.flash('message', 'User not found.');
        return res.redirect('/forgotpassword');
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
      if(err){ console.log(err); return res.redirect('/dashboard'); }
      if(reset){
        bcrypt.genSalt(10, function(err, salt){
          bcrypt.hash(b.password, salt, function(err, hash){
            newPassword = hash;
            User.findOne({ id: reset.user }, function(err, user){
              if(err){ return res.redirect('/dashboard'); }
              if(user){
                User.update(user, { password: newPassword }, function(err, user){
                  if(err){ return res.redirect('/dashboard'); }
                  PasswordReset.update(reset, { consumed: true }, function(err, reset){
                    if(err){ return res.redirect('/dashboard'); }
                    if(reset){
                      req.flash('message', 'Password changed. Please log in.');
                      res.redirect('/resetsuccess');
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

  passwordResetSuccess: function(req, res){
    res.view();
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
          EmailVerification.update(emailVerification, { token: token }, function(err, emailVerification){
            if(err) { return res.redirect('/dashboard'); }
            var htmlContent = '<a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';
            var mailOptions = {
              from: "welcome@procur.com",
              to: user.email,
              subject: "Please verify your Procur account!",
              generateTextFromHTML: true,
              html: htmlContent
            };

            smtpTransport.sendMail(mailOptions, function(err, response){
              if(err){res.serverError();}
              res.redirect('/dashboard');
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
            req.flash('error', 'Your email address has been verified. You can now log in.');
            return res.redirect('/dashboard');
          });
        });
      });
    };

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
