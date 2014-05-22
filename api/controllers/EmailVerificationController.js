/**
 * EmailVerificationController
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


  verify: function(req, res) {
    var token = req.query.token;

    if(!token) {
      res.redirect('/dashboard');
    }
    else {
      EmailVerification.findOne({ token: token }, function(err, verification){
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

  }


};
