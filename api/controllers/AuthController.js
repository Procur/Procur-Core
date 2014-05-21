/**
 * AuthController
 *
 */
var passport = require('passport');
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
           res.send(err);
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
        res.send(err);
        console.log('err should be written')
      }
      if(!user){
        User.create({ firstName: b.firstName, lastName: b.lastName, email: b.email, password: b.password, profileComplete: false }, function(err, user){
          if(err){
            res.send(err);
          }
          else{
            console.log("User: " + b.email + " created.");
            passport.authenticate('local', function(err, user, info) {
              if ((err) || (!user)) {
                return res.send({
                message: 'login failed'
                });
                res.send(err);
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

          }
        })
      }
      else {
        res.send({message: 'Email address is unavailable.'});
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
        res.send(err);
        console.log('err should be written')
      }
      else {
        res.view({ message: user.email + " signed out. "});
      }
    });
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
