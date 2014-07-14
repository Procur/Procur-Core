/**
 * UserController
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
var cloudinary = require('cloudinary');
var fs = require('fs');
var hasImage;

function getFileSize(file){
  var stats = fs.statSync(file);
  var fileSize = stats['size'];
  if (fileSize > 0){
    return true;
  }
  else {
    return false;
  }
}

module.exports = {

  welcome: function(req, res){
    Company.findOne({ user: req.session.passport.user },function(err, company){
      if(err){ return res.redirect('/dashboard'); }
      if(company === undefined){
        res.view();
      }
      else{
        res.redirect('/dashboard');
      }
    });
  },

  pleaseVerify: function(req, res){
    res.view();
  },

  updateAccount: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      Company.findOne({ user: user.id }, function(err, company){
        if(err) { return res.redirect('/dashboard'); }
        if(company !== undefined){
          res.view({ user: user, company: company });
        }
        else {
          return res.redirect('/dashboard');
        }
      });
    });
  },

  processUpdateAccount: function(req, res){
    var b = req.body;
    var image = req.files.image.path;
    var imageSize = getFileSize(image);
    var emailUnset;
    var jobTitle;
    if(b.jobTitle) {
      jobTitle = b.jobTitle;
    }
    else {
      jobTitle = "";
    };


    User.findOne({ id: req.session.passport.user }, function(err, user){
      if((b.email == "") || (b.email === undefined)){
        emailUnset = user.email;
      }
      else {
        emailUnset = b.email;
      }
      if(err){ return res.redirect('/') };
      if(user){
        if(imageSize) {
          cloudinary.uploader.upload(image, function(result){
            User.update(user, { firstName: b.firstName, lastName: b.lastName, email: emailUnset, image: result.url, jobTitle: b.jobTitle }, function(err, user){
              if(err){ req.flash('error', 'There is already an account associated with ' + emailUnset + '.'); return res.redirect('back');};
              if(user){
                req.flash('message', 'Account information updated.');
                res.redirect('back');
              }
              else {
                req.flash('error', 'There was a problem.');
                res.redirect('/');
              }
            });
          },
          {
            format: 'jpg',
            width: 150,
            height: 150,
            crop: 'thumb',
            gravity: 'face',
            radius: 'max'
          });
        }
        else{
          User.update(user, { firstName: b.firstName, lastName: b.lastName, email: emailUnset, jobTitle: b.jobTitle }, function(err, user){
            if(err){ 
              req.flash('error', 'There is already an account associated with ' + emailUnset + '.');
              return res.redirect('back');
            }
            if(user){
              req.flash('message', 'Account information updated.');
              res.redirect('back');
            }
            else {
              req.flash('error', 'There was a problem');
              res.redirect('/');
            }
          });
        }
      }
    });
  },

  toggleMode: function(req, res){
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err){ return res.redirect('/dashboard'); }
      if(user){
        Company.findOne({ user: user.id }, function(err, company){
          if((company.buyer == true) && (company.supplier == true)){
            User.update(user, { activeMode: b.mode }, function(err, user){
              if(err){ return res.redirect('/dashboard'); }
              req.flash('message', 'Switched to ' + user.activeMode + ' mode.');
              res.redirect('/dashboard');
            });
          }
        });
      }
      else {
        return res.redirect('/dashboard');
      }
    });
  }

};
