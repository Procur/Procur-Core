/**
 * wizardComplete
 *
 * @module      :: Policy
 * @description :: Checks completeness of Buyer / Supplier wizard forms
 *
 */

module.exports = function (req, res, next) {
  var user = req.session.passport.user;

  Company.findOne({ user: user }, function(err, company){
    if(company !== undefined){
      if(err) {res.redirect('/dashboard');}
      else {
        if (company.wizardComplete != true){
          if((company.buyer == true) && (company.supplier == true)) {
            if(!company.primaryMode){
              res.redirect('/welcome/selectdefault');
            }
            else {
              switch (company.primaryMode) {
                case 'buyer':
                  Buyer.findOne({ company: company.id }, function(err, buyer){
                    if(err){res.redirect('/dashboard');}
                    else if (buyer == undefined) {
                      res.redirect('/welcome/buyer');
                    }
                    else {
                      Supplier.findOne({ company: company.id }, function(err, supplier){
                        if(err){
                          res.redirect('/dashboard');
                        }
                        else if (supplier == undefined) {
                          res.redirect('/welcome/supplier');
                        }
                        else {return next();}
                      })
                    }
                  });
                  break;
                case 'supplier':
                  Supplier.findOne({ company: company.id }, function(err, supplier){
                    if(err){
                      res.redirect('/dashboard');
                    }
                    else if (supplier == undefined) {
                      res.redirect('/welcome/supplier');
                    }
                    else {
                      Buyer.findOne({ company: company.id }, function(err, buyer){
                        if(err){res.redirect('/dashboard');}
                        else if (buyer == undefined) {
                          res.redirect('/welcome/buyer');
                        }
                        else {return next();}
                      });
                    }
                  });
                  break;
              }
            }
          }
          else {
            async.parallel(
              {
                buyer: function(callback) {
                  Buyer
                    .findOne({ company: company.id })
                    .exec(function(err, buyer) {
                      if (err) { callback(err, null); }
                      else if (!buyer) { callback(null, undefined); }
                      else { callback(null, buyer); }
                  });
                },
                supplier: function(callback) {
                  Supplier
                    .findOne({ company: company.id })
                    .exec(function(err, supplier) {
                      if (err) { callback(err, null); }
                      else if (!supplier) { callback(null, undefined); }
                      else { callback(null, supplier); }
                  });
                }
              },
              function(err, data) {
                if (company.buyer === true && company.supplier === true) {
                  if (data.buyer === undefined && company.activeMode === "buyer") {
                    return res.redirect('/welcome/buyer');
                  }
                  if (data.supplier === undefined && company.activeMode === "supplier") {
                    return res.redirect('/welcome/supplier');
                  }
                }
                else if (company.buyer === true && company.supplier === false) {
                  if (data.buyer === undefined) { return res.redirect('/welcome/buyer'); }
                  if (err) { /* do something here */ }
                  else { return next(); }
                }
                else if (company.buyer === false && company.supplier === true) {
                  if (data.supplier === undefined) { return res.redirect('/welcome/supplier'); }
                  if (err) { /* do something here */ }
                  else { return next(); }
                }
                else { 
                  res.redirect('/welcome/moreinfo');
                }
              }
            )
          }
        }
        else {res.redirect('/welcome');}
      }
    }
    else{
      res.redirect('/welcome');
    }
  });
}
