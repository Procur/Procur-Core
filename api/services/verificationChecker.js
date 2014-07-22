/**
*
* The purpose of this service is to check for users
* that have issues with account verification and resolve those problems
*/
var nodemailer = require('nodemailer'),
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

  counter: function (){
    User.find({emailVerified:true}, function(err, users){
      if (users !== null){console.log("Count of verified Users: " + users.length);}
      else {console.log("Count of verified Users: 0"); }
    });
    User.find({emailVerified:false}, function(err, users){
      if (users !== null){console.log("Count of verified Users: " + users.length);}
      else {console.log("Count of verified Users: 0"); }
    });
    EmailVerification.find({},function (emails){
      if (emails !== null){console.log("Count of emailVerification objects: " + emails.length);}
      else {console.log("Count of emailVerification objects: 0");}
    });
  },

  // This function could be included in any action where we would like to check and resolve verification.
  //CThis checks for both non existent verification and people who have not verified yet and sends an email
  individualResolver: function () {
    User.findOne(req.session.passport.user, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      if(user.emailVerified === false){
        EmailVerification.findOne({ email: user.email }, function(err, emailVerification){
          if(err) { console.log(JSON.stringify(err)); return res.redirect('/dashboard'); }
          crypto.randomBytes(256, function(err, hash) {
            if(err) { return res.redirect('/dashboard'); }
            token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
            if (emailVerification === undefined){
              EmailVerification.create({ email: user.email, token: token }, function(err, emailVerification){
                if(err) {return res.redirect('/dashboard'); }
              });
            }
            else {
              EmailVerification.update(emailVerification, { token: token }, function(err, emailVerification){
              if(err) { return res.redirect('/dashboard'); }
              });
            }
            var htmlContent = '<a>Please verify your email via the link below.</a><br><a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';
            var mailOptions = {
              from: "welcome@procur.com",
              to: user.email,
              subject: "Your Procur account has not been verified yet.",
              generateTextFromHTML: true,
              html: htmlContent
            };
            smtpTransport.sendMail(mailOptions, function(err, response){
              if(err){res.serverError();}
              res.redirect('/dashboard');
            });
          });
        });
      }
    });
  },

//  For Users without associated emailVerification objects:
//  creates emailVerification object and sends an email to any users that do not have one already
  massResolver: function () {
    User.find({}, function(err, users){
      users.forEach(function(user){
        if (user.emailVerified === false){
          EmailVerification.findOne({ email: user.email }, function(err, emailVerification){
            if(err) { console.log(JSON.stringify(err)); }
            crypto.randomBytes(256, function(err, hash) {
              if(err) { console.log(JSON.stringify(err)); }
              token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
              if (emailVerification === undefined){
                EmailVerification.create({ email: user.email, token: token }, function(err, emailVerification){
                  if(err) {return res.redirect('/dashboard'); }
                });

              var htmlContent = '<a>Please verify your email via the link below.</a><br><a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';
              var mailOptions = {
                from: "welcome@procur.com",
                to: user.email,
                subject: "Your Procur account has not been verified yet.",
                generateTextFromHTML: true,
                html: htmlContent
              };
              smtpTransport.sendMail(mailOptions, function(err, response){
                if(err){res.serverError();}
                res.redirect('/dashboard');
              });
              }
            });
          });
        }
        });
    });
  },

  // Remind users that have not yet verified and created an email verification object for any that do not have one
  massReminder: function () {
    User.find({}, function(err, users){
      users.forEach(function(user){
        if (user.emailVerified === false){
          EmailVerification.findOne({ email: user.email }, function(err, emailVerification){
            if(err) { console.log(JSON.stringify(err)); }
            crypto.randomBytes(256, function(err, hash) {
              if(err) { console.log(JSON.stringify(err)); }
              token = hash.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
              if (emailVerification === undefined){
                EmailVerification.create({ email: user.email, token: token }, function(err, emailVerification){
                  if(err) {return res.redirect('/dashboard'); }
                });
              }
              else {
                EmailVerification.update(emailVerification, { token: token }, function(err, emailVerification){
                if(err) { console.log(JSON.stringify(err)); }
                });
              }
              var htmlContent = '<a>Please verify your email via the link below.</a><br><a href="http://' + address + '/verify?token=' + token + '">Click to verify your Procur account!</a>';
              var mailOptions = {
                from: "welcome@procur.com",
                to: user.email,
                subject: "Reminder: Your Procur account has not been verified yet.",
                generateTextFromHTML: true,
                html: htmlContent
              };
              smtpTransport.sendMail(mailOptions, function(err, response){
                if(err){res.serverError();}
                res.redirect('/dashboard');
              });
            });
          });
        }
        });
    });
  }
};
