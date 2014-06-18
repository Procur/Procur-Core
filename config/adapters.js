/**
 * Global adapter config
 *
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */

module.exports = {

  adapters:{

  'default': 'mongo',

    mongo: {
      module: 'sails-mongo',
      //url: process.env.DB_URL,
      url: 'mongodb://heroku:F0VDcijJX9uA9wBkje0LL3QNO-A5xKJjWUrUP1MXwF2bMzunk43Q6dToQkuuIbPxDOLHOYs5bdorjsi0VHsSLg@candidate.21.mongolayer.com:10306,candidate.20.mongolayer.com:10307/app25752330',
      schema: true
    }
  }
};
