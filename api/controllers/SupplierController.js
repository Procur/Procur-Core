/**
 * SupplierController
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
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) return res.redirect('/dashboard');
      Company.findOne({ user: user.id }, function(err, company){
        if(err) return res.redirect('/dashboard');
        Supplier.findOne({ company: company.id }, function(err, supplier){
            //TODO: Pass all supplier attributes to view.
            res.view();
        });
      });
    });
  },

  create: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) return res.redirect('/dashboard');
      Company.findOne({ user: user.id }, function(err, company){
        if(err) return res.redirect('/dashboard');
        Supplier.create({  }, function(err, supplier){
          if(err) return res.redirect('/dashboard');
          //TODO: pass all supplier params from supplier wizard into create method
          console.log('Supplier created: ' + supplier.company);
          res.redirect('/dashboard');
        });
      });
    });
  },

  update: function(req, res){

  },

  destroy: function(req, res){
    User.findOne({ id: req.session.passport.user }, function(err, user){
      if(err) return res.redirect('/dashboard');
      Company.findOne({ user: user.id }, function(err, company){
        if(err) return res.redirect('/dashboard');
        Supplier.findOne({ company: company.id }, function(err, supplier){
            if(err) return res.redirect('/dashboard');
            Supplier.update(supplier, { active: false });
        });
      });
    });
  }

};
