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
          //company is buyer OR supplier but not both
          if (company.buyer == true) {
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){res.redirect('/welcome/buyer');}
              else {return next();}
            });
          }
          else if (company.supplier == true) {
            Supplier.findOne({ company: company.id }, function(err, supplier){
              if(err){res.redirect('/welcome/supplier');}
              else {return next();}
            });
          }
          else if ((company.supplier == undefined) && (company.buyer == undefined)) {
            res.redirect('/welcome/moreinfo');
          }
          else {res.redirect('/dashboard');}
        }
      }
      else {res.redirect('/welcome');}
    }
  });
}
