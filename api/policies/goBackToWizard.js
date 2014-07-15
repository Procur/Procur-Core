/**
 * wizardComplete
 *
 * @module      :: Policy
 * @description :: Checks completeness of Buyer / Supplier wizard forms and
 *                 prevents access to buyer/supplier/both selection
 *
 */

module.exports = function (req, res, next) {
    var payload = [];
    var user = req.session.passport.user;
    var async = require('async');
    Company.findOne({ user: user }, function(err, company) {
      if (err) { return res.redirect('/dashboard'); }
      if (!company) { return res.redirect('/404'); }
      if (company !== undefined) {
        async.parallel(
          {
            buyer: function(callback) {
              Buyer
                .findOne({ company: company.id })
                .exec(function(err, buyer) {
                  if (err) { callback(err, null); }
                  else if (!buyer) { callback(null, undefined); }
                  else {
                    callback(null, buyer);
                  }
                });
            },
            supplier: function(callback) {
              Supplier
                .findOne({ company: company.id})
                .exec(function(err, supplier) {
                  if (err) { callback(err, null); }
                  else if (!supplier) { callback(null, undefined); }
                  else {
                    callback(null, supplier);
                  }
                });
            }
          },
          function (err, data) {
            if (err) { res.redirect('/dashboard'); }
            if (company.buyer == true && company.supplier == true ){
              if (data.buyer && data.supplier) {
                //if default has not been selected yet go to that screen
                if(!company.primaryMode) { res.redirect('/welcome/selectdefault'); }
                else if(!company.handle){ res.redirect('/company/handle'); }
                else { res.redirect('/dashboard');  }
              }//once create buyer/supplier completes it should redirect to dashboard from the action
              if (!data.buyer) {
                if(req.route.path == '/welcome/buyer') { return next(); }
              }
              if (!data.supplier) {
                if(req.route.path == '/welcome/supplier') { return next(); }
              }
              res.redirect('/dashboard');
            }
            if (data.buyer && data.supplier) {
              // this should never evaluate to true but incase it does
              if ((company.supplier == false) || (company.buyer == false)){
                res.redirect('/welcome/both');
              }
              //if default has not been selected yet go to that screen
              if(!company.primaryMode) {
                res.redirect('/welcome/selectdefault'); }
              else { res.redirect('/dashboard'); }
            }
            else if ((data.buyer) && (data.supplier === undefined)) {
              // if buyer data and only buyer was selected, then the wizard is complete so redirect to dashboard
              if(company.buyer == true && company.supplier == false){ res.redirect('/dashboard'); }
            }
            else if ((data.buyer === undefined) && (data.supplier)) {
              // if supplier data and only supplier was selected, then the wizard is complete so redirect to dashboard
              if(company.buyer == false && company.supplier == true){ res.redirect('/dashboard'); }
            }
            else { return next() }
          }
        );
      }
    });
};
