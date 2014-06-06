/**
 * DashboardController
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
    /*var user = req.session.passport.user;
    var payload = [];
    User.findOne({ id: user }, function(err, user){
      if(err) { return res.redirect('/dashboard'); }
      else {
        payload.push(user);
        Company.findOne({ user: user.id }, function(err, company){
          if(err) { return res.redirect('/dashboard'); }
          payload.push(company);
          res.view({ user: payload[0], company: payload[1] })
        });
      }
    });
  }*/

    res.redirect('http://localhost:1338');
  }

};
