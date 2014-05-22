/**
 * EmailVerification
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	email: {
      type: 'email',
      required: 'true',
      unique: true
    },

    token: {
      type: 'string',
      required: 'true',
      unique: true
    }
  }

};
