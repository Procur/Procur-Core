/**
 * Session
 *
 * Sails session integration leans heavily on the great work already done by Express, but also unifies
 * Socket.io with the Connect session store. It uses Connect's cookie parser to normalize configuration
 * differences between Express and Socket.io and hooks into Sails' middleware interpreter to allow you
 * to access and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again.




  ////////// DO NOT CHANGE!!! //////////
  secret: '8666c1f82163ab798e9792f1911cadcb',


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
  adapter: 'redis',
  //
  // The following values are optional, if no options are set a redis instance running
  // on localhost is expected.
  // Read more about options at: https://github.com/visionmedia/connect-redis
  //
  host: 'angelfish.redistogo.com',
  port: '9809',
  // ttl: <redis session TT'L in seconds>,
  db: 'process.env.REDIS_DB',
  pass: '0d5b806697a93b4cd6f1f66bd4b24c18'

  /*

  host: 'angelfish.redistogo.com',
  port: 9809,
  // ttl: <redis session TTL in seconds>,
  db: 'redistogo',
  pass: '0d5b806697a93b4cd6f1f66bd4b24c18'

  */
  // prefix: 'sess:'


  // Uncomment the following lines to use your Mongo adapter as a session store
  // adapter: 'mongo',
  //
  // host: 'localhost',
  // port: 27017,
  // db: 'sails',
  // collection: 'sessions',
  //
  // Optional Values:
  //
  // # Note: url will override other connection settings
  // url: 'mongodb://user:pass@host:port/database/collection',
  //
  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};
