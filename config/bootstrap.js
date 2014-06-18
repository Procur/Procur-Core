/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {
  sails.newrelic = require('newrelic');
  var cloudinary = require('cloudinary');


  //ENVIRONMENT URL
  /*if(process.env.NODE_ENV == 'production'){
    process.env.ENVIRONMENT_URL = "procur.com";
  }
  else if(process.env.NODE_ENV == 'staging'){
    process.env.ENVIRONMENT_URL = "procur-core.staging.herokuapp.com";
  }
  else if(process.env.NODE_ENV == 'development'){
    process.env.ENVIRONMENT_URL = 'localhost:1337';
    process.env.DB_URL = 'mongodb://localhost:27017/procur-core';
    process.env.REDIS_HOST = 'localhost';
    process.env.REDIS_PORT = '6379';
    process.env.REDIS_DB = 'procur-core';
    process.env.REDIS_PASS = '';
  }*/

  //ENVIRONMENT DB


  cloudinary: cloudinary.config({
    cloud_name: 'huewqecyr',
    api_key: '881324675953382',
    api_secret: 'ba-JzMMUoznUYbnalqxZD3ogTe4'
  });


  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
