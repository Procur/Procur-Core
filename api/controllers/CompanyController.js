/**
 * CompanyController
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

  setup: function(req, res){
    var b = req.body;
  },

  create: function(req, res){
    var b = req.body;
    console.log(req.session.passport.user);
    console.log(req.body);
    console.log(b.companyName);

    Company.create({
      user: req.session.passport.user,
      companyName: b.companyName,
      companyPhone: b.companyPhone,
      companyPhoneExt: b.companyPhoneExt,
      companyFax: b.companyFax,
      companyFaxExt: b.companyFaxExt,
      companyWebsite: b.companyWebsite,
      companyAddress1: b.companyAddress1,
      companyAddress2: b.companyAddress2,
      companyCountry: b.companyCountry,
      companyProvince: b.companyProvince,
      companyPostalCode: b.companyPostalCode,
      companyIsHq: b.companyIsHq,
      hqAddress1: b.hqAddress1,
      hqAddress2: b.hqAddress2,
      hqCountry: b.hqCountry,
      hqProvince: b.hqProvince,
      hqPostalCode: b.hqPostalCode,
      companyType: b.companyType,
      companyIndustry: b.companyIndustry,
      companyEmployeeCount: b.companyEmployeeCount
    }, function(err, company){
      if(err){
        console.log("Failed at create company");
        res.send(err);
      }
      else{
        User.findOne({ id: req.session.user }, function(err, user){
          if (err) {
            console.log("Failed at findone user");
            res.send(err);
          }
          else {
            user.update({ profileComplete: true }, function(err, user){
              if (err){
                console.log("Failed at update user");
                rs.send(err);
              }
              else {
                res.redirect('/dashboard');
              }
            });
          };
        });
      }
    });
  }
    //Final Action: Redirect to Dashboard
    //profileComplete policy is executed to ensure proper Company setup


};
