/**
 * AuthController
 *
 */
var passport = require('passport');
module.exports = {

  //MOVED TO HOME CONTROLLER FOR LOGIN MODAL
  /*login: function (req, res) {
    res.view();
  },*/


    process: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
        return res.send({
        message: 'login failed'
        });
        res.send(err);
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: 'login successful'
        });
      });
    })(req, res);
  },

  register: function(req, res){
    var b = req.body;
    var created = false;

    User.findOne({ email: b.email}, function(err, user){
      if(err) {
        res.send(err);
        console.log('err should be written')
      }
      if(!user){
        User.create({ firstName: b.firstName, lastName: b.lastName, email: b.email, password: b.password }, function(err, user){
          if(err){
            created = false;
            res.send(err);
          }
          else{
            created = true;
            console.log("User: " + b.email + " created.");
          }
        })
      }
      else {
        created = false;
        res.send({message: 'Email address is unavailable.'});
      }
    });

    if(created = true){
      res.redirect('/dashboard');
    };
  },

  logout: function (req,res){
    req.logout();
    res.send('logout successful');
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
