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
    if(err) {
      console.log(17);
      res.redirect('/dashboard');
    }
    else {
      console.log("Company found: " + company);
      if (company.wizardComplete != true){
        if((company.buyer == true) && (company.supplier == true)) {
          console.log('both true')
          if(!company.primaryMode){
            res.redirect('/welcome/selectdefault');
          }
          else {
            console.log('primary mode: ' + company.primaryMode);
          switch (company.primaryMode) {
          case 'buyer':
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){
                console.log(1);
                res.redirect('/dashboard');
              }
              else if (buyer == undefined) {
                console.log(2);
                res.redirect('/welcome/buyer');
              }
              else {
                Supplier.findOne({ company: company.id }, function(err, supplier){
                  if(err){
                    console.log(3);
                    res.redirect('/dashboard');
                  }
                  else if (supplier == undefined) {
                    console.log(4);
                    res.redirect('/welcome/supplier');
                  }
                  else {
                    console.log(10);
                    return next();
                  }
                })
              }
            });
            break;
            case 'supplier':
              Supplier.findOne({ company: company.id }, function(err, supplier){
                if(err){
                  console.log(5);
                  res.redirect('/dashboard');
                }
                else if (supplier == undefined) {
                  console.log(6);
                  res.redirect('/welcome/supplier');
                }
                else {
                  Buyer.findOne({ company: company.id }, function(err, buyer){
                    if(err){
                      console.log(7);
                      res.redirect('/dashboard');
                    }
                    else if (buyer == undefined) {
                      console.log(8);
                      res.redirect('/welcome/buyer');
                    }
                    else {
                      console.log(9);
                      return next();
                    }
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
              if(err){
                console.log(11);
                res.redirect('/welcome/buyer');
              }
              else {
                console.log(12);
                return next();
              }
            });
          }
          else if (company.supplier == true) {
            Supplier.findOne({ company: company.id }, function(err, supplier){
              if(err){
                console.log(13);
                res.redirect('/welcome/supplier');
              }
              else {
                console.log(14);
                return next();
              }
            });
          }
          else if ((company.supplier == undefined) && (company.buyer == undefined)) {
            console.log(20)
            res.redirect('/welcome/moreinfo');
          }
          else {
            console.log(15);
            res.redirect('/dashboard');
          }
        }
      }
      else {
        console.log(16);
        res.redirect('/welcome');
      }
    }
  });
}
