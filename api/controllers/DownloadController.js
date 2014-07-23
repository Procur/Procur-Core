/**
 * DownloadController
 *
 * @description :: Server-side logic for managing downloads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	process: function(req, res){
    console.log("hits process");
    var b = req.body;
    User.findOne({ id: req.session.passport.user }, function(err, user) {
      Company.findOne({ user: user.id }, function(err, company) {
        if (err) { return res.redirect('/dashboard'); }
        if (b.privateLabeler == "privateLabeler") { b.privateLabeler = true; } else { b.privateLabeler = false; }
        
        if(user.activeMode == 'supplier'){
          Supplier.findOne({ company: company.id }, function(err, supplier){
            if(err){ return res.redirect('/dashboard'); }
            Download.create({
              owner: supplier.id,
              title: b.downloadTitle
            }, function(err, supplier) {
              if (err) { return res.redirect('/dashboard'); }
            });
            return res.redirect('/company/update#photosDownloadsSupplier');
          });
        }
        if (user.activeMode == 'buyer'){
          Buyer.findOne({ company: company.id }, function(err, buyer){
            if(err){ return res.redirect('/dashboard'); }
            Download.create({
              owner: buyer.id,
              title: b.downloadTitle
            }, function(err, buyer) {
              if (err) { return res.redirect('/dashboard'); }
            });
            return res.redirect('/company/update#photosDownloadsBuyer');
          });
        }

      });
    });
  }

  /* Need a delete function */
};
