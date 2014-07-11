// Start sails and pass it command line arguments
var newrelic = require('newrelic');
require('sails').lift(require('optimist').argv);
