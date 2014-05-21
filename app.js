// Start sails and pass it command line arguments
if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'Procur-Core' // optional
  });
}
require('sails').lift(require('optimist').argv);
