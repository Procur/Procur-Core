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
    //dictionary for all the filenames, added to dynamically
    var filenameDict = {};
    //var for if a file was uploaded or not
    var uploaded = false;
    //the maximum file size a user can upload in bytes
    var maxSize = 32000000; //in bytes
    //number of proper uploads a user submits
    var numUploads = 0;
    //array of proper uploads indicies 
    var uploadArray = [];
    //find out the number of uploads and their indicies 
    for (i = 0; i < 5; i++) {
      if (req.files["downloadURI" + i]) {
        if (b["downloadTitle" + i] && b["downloadTitle" + i][0] != "" && req.files["downloadURI" + i].headers['content-type'] != "application/octet-stream" && req.files["downloadURI" + i].size < maxSize) {
          numUploads++;
          uploadArray.push(i);
        }
      }
    }
    //if there are no uploads it sends them back
    if (numUploads == 0) {
      req.flash('message', 'No downloads uploaded.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    User.findOne({
      id: req.session.passport.user
    }, function(err, user) {
      if (err) {
        return res.redirect('/dashboard');
      }
      Company.findOne({
        user: user.id
      }, function(err, company) {
        if (err) {
          return res.redirect('/dashboard');
        }
        Buyer.findOne({
          company: company.id
        }, function(err, buyer) {
          if (err) {
            return res.redirect('/dashboard');
          }
          async.times(numUploads, function(n, next) {
            if (req.files["downloadURI" + uploadArray[n]]) {
              if (b["downloadTitle" + uploadArray[n]] && b["downloadTitle" + uploadArray[n]][0] != "" && req.files["downloadURI" + uploadArray[n]].headers['content-type'] != "application/octet-stream" && req.files["downloadURI" + uploadArray[n]].size < maxSize) {
                console.log("cur N: " + uploadArray[n]);
                filepath = req.files["downloadURI" + uploadArray[n]].path;
                filename1 = b["downloadTitle" + uploadArray[n]];
                filenameDict["filename" + uploadArray[n]] = filename1;
                filename = filename1 + "." + req.files["downloadURI" + uploadArray[n]].path.split(".").pop();
                filetype = req.files["downloadURI" + uploadArray[n]].headers['content-type'];
                console.log("FILEPATH " + filepath);
                console.log("filetype: " + filetype)
                console.log(filename);
                console.log(filetype);
                fStream = fs.createReadStream(filepath);
                var uploader = new streamingS3(fStream, 'AKIAJJ2Y43ZH662PWFUA', 'IGrhMgy29wD++dB9H9pMzLqOhx5cll45U1qWy+uJ', {
                  Bucket: 'procur-cms',
                  Key: filename,
                  ContentType: filetype,
                  ACL: 'public-read'
                }, function(err, resp, filename1, stats) {
                  if (err) return res.redirect('/dashboard');
                  //console.log('Upload stats: ', stats);
                  //console.log('Upload successful: ', resp);
                  //console.log('start');
                  //console.log(buyer.id);
                  //console.log(resp.Location);
                  //console.log(b["downloadTitle"][0]);
                  Download.create({
                    owner: buyer.id,
                    title: filenameDict["filename" + uploadArray[n]],
                    active: true,
                    assetUrl: resp.Location
                  }, function(err, post) {
                    //console.log(post);
                    if (err) {
                      console.log("ERROR " + JSON.stringify(err, null, ' '));
                      req.flash("There was a problem. Try again.");
                      res.redirect("/company/update");
                    } else {
                      console.log("next:" + uploadArray[n]);
                      uploaded = true;
                      next(err, post);
                    }
                  }); //End download create
                }); //End uploader function
              } else {
                //console.log("blah next:"+n);
                next(err, buyer);
              }
            } else {
              next(err, buyer);
            }
          }, function(err) {
            if (err) {
              return res.redirect('/dashboard');
            }
            if (uploaded) {
              req.flash('message', 'Downloads successfully uploaded.');
            } else {
              req.flash('message', 'No downloads uploaded.');
            }
            f (res.headersSent) {
              console.log("blah");
            } else {
              return res.redirect('/company/update#photosDownloadsSupplier');
            }

          });
        }); //Supplier find one done
      }); //Company find one done
    }); //User find one done
  },

  processSupplier: function(req, res) {
    var b = req.body;
    //dictionary for all the filenames, added to dynamically
    var filenameDict = {};
    //var for if a file was uploaded or not
    var uploaded = false;
    //the maximum file size a user can upload in bytes
    var maxSize = 32000000; //in bytes
    //number of proper uploads a user submits
    var numUploads = 0;
    //array of proper uploads indicies 
    var uploadArray = [];
    //find out the number of uploads and their indicies 
    for (i = 0; i < 5; i++) {
      if (req.files["downloadURI" + i]) {
        if (b["downloadTitle" + i] && b["downloadTitle" + i][0] != "" && req.files["downloadURI" + i].headers['content-type'] != "application/octet-stream" && req.files["downloadURI" + i].size < maxSize) {
          numUploads++;
          uploadArray.push(i);
        }
      }
    }
    //if there are no uploads it sends them back
    if (numUploads == 0) {
      req.flash('message', 'No downloads uploaded.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    User.findOne({
      id: req.session.passport.user
    }, function(err, user) { //start User
      console.log("in user");
      if (err) {
        return res.redirect('/dashboard');
      }
      Company.findOne({
        user: user.id 
      }, function(err, company) { //start company
        console.log("in company");
        if (err) {
          return res.redirect('/dashboard');
        }
        Supplier.findOne({
          company: company.id
        }, function(err, supplier) {
          console.log("in supplier");
          if (err) {
            return res.redirect('/dashboard');
          }
          async.times(numUploads, function(n, next) {
            console.log("in async");
            if (req.files["downloadURI" + uploadArray[n]]) {
              if (b["downloadTitle" + uploadArray[n]] && b["downloadTitle" + uploadArray[n]][0] != "" && req.files["downloadURI" + uploadArray[n]].headers['content-type'] != "application/octet-stream" && req.files["downloadURI" + uploadArray[n]].size < maxSize) {
                console.log("cur N: " + uploadArray[n]);
                filepath = req.files["downloadURI" + uploadArray[n]].path;
                filename1 = b["downloadTitle" + uploadArray[n]];
                filenameDict["filename" + uploadArray[n]] = filename1;
                filename = filename1 + "." + req.files["downloadURI" + uploadArray[n]].path.split(".").pop();
                filetype = req.files["downloadURI" + uploadArray[n]].headers['content-type'];
                console.log("FILEPATH " + filepath);
                console.log("filetype: " + filetype)
                console.log(filename);
                console.log(filetype);
                fStream = fs.createReadStream(filepath);
                var uploader = new streamingS3(fStream, 'AKIAJJ2Y43ZH662PWFUA', 'IGrhMgy29wD++dB9H9pMzLqOhx5cll45U1qWy+uJ', {
                  Bucket: 'procur-cms',
                  Key: filename,
                  ContentType: filetype,
                  ACL: 'public-read'
                }, function(err, resp, filename1, stats) {
                  if (err) return res.redirect('/dashboard');
                  //console.log('Upload stats: ', stats);
                  //console.log('Upload successful: ', resp);
                  //console.log('start');
                  //console.log(supplier.id);
                  //console.log(resp.Location);
                  //console.log(b["downloadTitle"][0]);
                  Download.create({
                    owner: supplier.id,
                    title: filenameDict["filename" + uploadArray[n]],
                    active: true,
                    assetUrl: resp.Location
                  }, function(err, post) {
                    console.log("in download");
                    //console.log(post);
                    if (err) {
                      console.log("ERROR " + JSON.stringify(err, null, ' '));
                      req.flash("There was a problem. Try again.");
                      res.redirect("/company/update");
                    } else {
                      console.log("next:" + uploadArray[n]);
                      uploaded = true;
                      next(err, post);
                    }
                  }); //End download create
                }); //End uploader function
              } else {
                //console.log("blah next:"+n);
                next(err, supplier);
              }
            } else {
              next(err, supplier);
            }
          }, function(err) {
            console.log("after async");
            if (err) {
              console.log("after async1");
              return res.redirect('/dashboard');
            }
            if (uploaded) {
              console.log("after async2");
              req.flash('message', 'Downloads successfully uploaded.');
            } else {
              console.log("after async3");
              req.flash('message', 'No downloads uploaded.');
            }
            console.log("after async4");
            if (res.headersSent) {
              console.log("blah");
            } else {
              return res.redirect('/company/update#photosDownloadsSupplier');
            }

          });
        }); //Supplier find one done
      }); //Company find one done
    }); //User find one done
  },

  removeBuyer: function(req, res) {
    var b = req.body;
    if (b["deleteMe"]) {
      if (typeof b["deleteMe"] == "string") {
        var downloadid = b["deleteMe"];
        Download.update(downloadid, {
          active: false
        }).exec(function(err, download) {
          if (err) {
            return res.redirect('/dashboard');
          }
          if (!download) {
            res.redirect('/dashboard');
          }
        });
      } else {
        for (var i = 0; i < b["deleteMe"].length; i++) {
          var downloadid = b["deleteMe"][i];
          Download.update(downloadid, {
            active: false
          }).exec(function(err, download) {
            if (err) {
              return res.redirect('/dashboard');
            }
            if (!download) {
              res.redirect('/dashboard');
            }
          });
        }
      }
      req.flash('message', 'Downloads successfully removed.');
      return res.redirect('/company/update#photosDownloadsBuyer');
    }
    return res.redirect('/company/update#photosDownloadsBuyer');
  },

  removeSupplier: function(req, res) {
    var b = req.body;
    if (b["deleteMe"]) {
      if (typeof b["deleteMe"] == "string") {
        var downloadid = b["deleteMe"];
        Download.update(downloadid, {
          active: false
        }).exec(function(err, download) {
          if (err) {
            return res.redirect('/dashboard');
          }
          if (!download) {
            res.redirect('/dashboard');
          }
        });
      } else {
        for (var i = 0; i < b["deleteMe"].length; i++) {
          var downloadid = b["deleteMe"][i];
          Download.update(downloadid, {
            active: false
          }).exec(function(err, download) {
            if (err) {
              return res.redirect('/dashboard');
            }
            if (!download) {
              res.redirect('/dashboard');
            }
          });
        }
      }
      req.flash('message', 'Downloads successfully removed.');
      return res.redirect('/company/update#photosDownloadsSupplier');
    }
    return res.redirect('/company/update#photosDownloadsSupplier');
  }
};