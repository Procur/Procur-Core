/**
 * DownloadController
 *
 * @description :: Server-side logic for managing downloads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	processBuyer: function(req, res){
    var b = req.body;
    if (b["downloadTitle"]){
      User.findOne({ id: req.session.passport.user }, function(err, user) {
        Company.findOne({ user: user.id }, function(err, company) {
          if (err) { return res.redirect('/dashboard'); }
          //if (user.activeMode == 'buyer'){
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){ return res.redirect('/dashboard'); }
              if (typeof b["downloadTitle"]=="string"){
                if (b["downloadTitle"]!==""){
                  Download.create({
                    owner: buyer.id,
                    title: b["downloadTitle"],
                    active: true
                  }, function(err, download) {
                    if (err) { return res.redirect('/dashboard'); }
                  });
                }
              } else {
                for (var i=0; i<b["downloadTitle"].length; i++){
                  if (b["downloadTitle"][i]!==""){
                    Download.create({
                      owner: buyer.id,
                      title: b["downloadTitle"][i],
                      active: true
                    }, function(err, download) {
                      if (err) { return res.redirect('/dashboard'); }
                    });
                  }
                }
              }
            });
          //}
        });
      });
      req.flash('message', 'Downloads successfully uploaded.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    return res.redirect('/company/update');
  },

  processSupplier: function(req, res){
    var b = req.body;
    if (b["downloadTitle"]){
      User.findOne({ id: req.session.passport.user }, function(err, user) {
        Company.findOne({ user: user.id }, function(err, company) {
          if (err) { return res.redirect('/dashboard'); }
          //if(user.activeMode == 'supplier'){
            Supplier.findOne({ company: company.id }, function(err, supplier){
              if(err){ return res.redirect('/dashboard'); }
              if (typeof b["downloadTitle"]=="string"){
                if (b["downloadTitle"]!==""){
                  Download.create({
                    owner: supplier.id,
                    title: b["downloadTitle"],
                    active: true
                  }, function(err, download) {
                    if (err) { return res.redirect('/dashboard'); }
                  });
                }
              } else {
                for (var i=0; i<b["downloadTitle"].length; i++){
                  if (b["downloadTitle"][i]!==""){
                    Download.create({
                      owner: supplier.id,
                      title: b["downloadTitle"][i],
                      active: true
                    }, function(err, download) {
                      if (err) { return res.redirect('/dashboard'); }
                    });
                  }
                }
              }
            });
          //}
        });
      });
      req.flash('message', 'Downloads successfully uploaded.');
      return res.redirect('/company/update#photosDownloadsSupplier');
    }
    return res.redirect('/company/update');
  },

  removeBuyer: function (req, res){
    var b = req.body;
    if (b["deleteMe"]){
      if (typeof b["deleteMe"]=="string"){
        var downloadid = b["deleteMe"];
        Download.update(downloadid, {
          active: false
        }).exec(function (err, download){
            if(err){ return res.redirect('/dashboard'); }
            if (!download){res.redirect('/dashboard');}
        });
      } else {
        for (var i=0; i<b["deleteMe"].length; i++){
          var downloadid = b["deleteMe"][i];
          Download.update(downloadid, {
            active: false
          }).exec(function (err, download){
            if(err){ return res.redirect('/dashboard'); }
            if (!download){res.redirect('/dashboard');}
          });
        }
      }
      req.flash('message', 'Downloads successfully removed.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    return res.redirect('/company/update#photosDownloadsBuyer');
  },

  removeSupplier: function (req, res){
    var b = req.body;
    if (b["deleteMe"]){
      if (typeof b["deleteMe"]=="string"){
        var downloadid = b["deleteMe"];
        Download.update(downloadid, {
          active: false
        }).exec(function (err, download){
            if(err){ return res.redirect('/dashboard'); }
            if (!download){res.redirect('/dashboard');}
        });
      } else {
        for (var i=0; i<b["deleteMe"].length; i++){
          var downloadid = b["deleteMe"][i];
          Download.update(downloadid, {
            active: false
          }).exec(function (err, download){
            if(err){ return res.redirect('/dashboard'); }
            if (!download){res.redirect('/dashboard');}
          });
        }
      }
      req.flash('message', 'Downloads successfully removed.');
      return res.redirect('/company/update#photosDownloadsSupplier');
    }
    return res.redirect('/company/update#photosDownloadsSupplier');
  }
};
