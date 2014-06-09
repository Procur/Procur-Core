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

module.exports = {

  welcome: function(req, res){
    res.view();
  },

  myProcur: function(req, res){
    res.view();
  },

  pleaseVerify: function(req, res){
    res.view();
  },

  updateAccount: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      res.view({ user: user });
    });
  },

  processUpdateAccount: function(req, res){
    var b = req.body;

  },

  toggleMode: function(req, res){
    var b = req.body;
    console.log(b);
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err){ return res.redirect('/dashboard'); }
      if(user){
        Company.findOne({ user: user.id }, function(err, company){
          if((company.buyer == true) && (company.supplier == true)){
            User.update(user, { activeMode: b.mode }, function(err, user){
              if(err){ return res.redirect('/dashboard'); }
              req.flash('Switched to ' + user.activeMode + ' mode.');
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
