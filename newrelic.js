/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  rules: { ignore: ['^/socket.io/*/xhr-polling'] },
  app_name : ['CORE PRODUCTION'],
  license_key : process.env.NEW_RELIC_LICENSE_KEY,
  logging : { level : 'warn' }
};
