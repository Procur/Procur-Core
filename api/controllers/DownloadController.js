/**
 * DownloadController
 *
 * @description :: Server-side logic for managing downloads
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var streamingS3 = require('streaming-s3');
var fs = require('fs');

module.exports = {

	processBuyer: function(req, res) {
    var b = req.body;
    var temp = {};
    User.findOne({ id: req.session.passport.user }, function(err, user) {
        Company.findOne({ user: user.id }, function(err, company) {
          if (err) { return res.redirect('/dashboard'); }
            Buyer.findOne({ company: company.id }, function(err, buyer){
              if(err){ return res.redirect('/dashboard'); }
              async.times(5, function(n, next) {
                if (b["downloadTitle"+n] && b["downloadTitle"+n][0] != "" && req.files["downloadURI"+n].headers['content-type'] != "application/octet-stream") {           
                  //console.log("cur N: "+n);
                  filepath = req.files["downloadURI"+n].path;
                  filename1 = b["downloadTitle"+n];
                  temp["filename"+n] = filename1;
                  filename = filename1+"."+req.files["downloadURI"+n].path.split(".").pop();
                  filetype = req.files["downloadURI"+n].headers['content-type'];
                  //console.log("FILEPATH "+filepath);
                  //console.log("filetype: "+filetype)
                  //console.log(filename);
                  //console.log(filetype);
                  fStream = fs.createReadStream(filepath);
                  var uploader = new streamingS3(fStream, 'AKIAJJ2Y43ZH662PWFUA', 'IGrhMgy29wD++dB9H9pMzLqOhx5cll45U1qWy+uJ',
                    {
                      Bucket: 'procur-cms',
                      Key: filename,
                      ContentType: filetype,
                      ACL: 'public-read'
                    },  function (err, resp, filename1, stats) {
                      if (err) return console.log('Upload error: ', err);
                        //console.log('Upload stats: ', stats);
                        //console.log('Upload successful: ', resp);
                        //console.log('start');
                        //console.log(buyer.id);
                        //console.log(resp.Location);
                        //console.log(b["downloadTitle"][0]);
                        Download.create({ owner: buyer.id,
                                  title: temp["filename"+n],
                                  active: true,
                                  assetUrl: resp.Location
                                   }, function(err,post){
                          //console.log(post);
                          if (err){
                            //console.log("ERROR " + JSON.stringify(err, null, ' '));
                            req.flash("There was a problem. Try again.");
                            res.redirect("/company/update");
                            }
                          else {
                            //console.log("next:"+n);
                            next(err, post);
                          }
                        });
                    }
                  );
              } else {
                //console.log("blah next:"+n);
                next(err, buyer);
              }
            }, function(err) {
                req.flash('message', 'Downloads successfully uploaded.');
                return res.redirect('/company/update#photosDownloadsBuyer');
            });
            });//buyer findone done
        });
    });
  },

  processSupplier: function(req, res){
    var b = req.body;
    var temp = {};
    User.findOne({ id: req.session.passport.user }, function(err, user) {
        Company.findOne({ user: user.id }, function(err, company) {
          if (err) { return res.redirect('/dashboard'); }
            Supplier.findOne({ company: company.id }, function(err, supplier){
              if(err){ return res.redirect('/dashboard'); }
              async.times(5, function(n, next) {
                if (b["downloadTitle"+n] && b["downloadTitle"+n][0] != "" && req.files["downloadURI"+n].headers['content-type'] != "application/octet-stream") {           
                  //console.log("cur N: "+n);
                  filepath = req.files["downloadURI"+n].path;
                  filename1 = b["downloadTitle"+n];
                  temp["filename"+n] = filename1;
                  filename = filename1+"."+req.files["downloadURI"+n].path.split(".").pop();
                  filetype = req.files["downloadURI"+n].headers['content-type'];
                  //console.log("FILEPATH "+filepath);
                  //console.log("filetype: "+filetype)
                  //console.log(filename);
                  //console.log(filetype);
                  fStream = fs.createReadStream(filepath);
                  var uploader = new streamingS3(fStream, 'AKIAJJ2Y43ZH662PWFUA', 'IGrhMgy29wD++dB9H9pMzLqOhx5cll45U1qWy+uJ',
                    {
                      Bucket: 'procur-cms',
                      Key: filename,
                      ContentType: filetype,
                      ACL: 'public-read'
                    },  function (err, resp, filename1, stats) {
                      if (err) return console.log('Upload error: ', err);
                        //console.log('Upload stats: ', stats);
                        //console.log('Upload successful: ', resp);
                        //console.log('start');
                        //console.log(supplier.id);
                        //console.log(resp.Location);
                        //console.log(b["downloadTitle"][0]);
                        Download.create({ owner: supplier.id,
                                  title: temp["filename"+n],
                                  active: true,
                                  assetUrl: resp.Location
                                   }, function(err,post){
                          //console.log(post);
                          if (err){
                            //console.log("ERROR " + JSON.stringify(err, null, ' '));
                            req.flash("There was a problem. Try again.");
                            res.redirect("/company/update");
                            }
                          else {
                            //console.log("next:"+n);
                            next(err, post);
                          }
                        });
                    }
                  );
              } else {
                //console.log("blah next:"+n);
                next(err, supplier);
              }
            }, function(err) {
                req.flash('message', 'Downloads successfully uploaded.');
                return res.redirect('/company/update#photosDownloadsSupplier');
            });
            });//buyer findone done
        });
    });
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
