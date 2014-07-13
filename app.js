// Start sails and pass it command line arguments
var newrelic = require('newrelic');
var sails = require('sails');
var config = sails.util.merge(require('optimist').argv,{
  hooks: {
    sockets: false,
    pubsub: false
  }
});
require('sails').lift(config);