/**
 * Location
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    company: {        //Connects relationship to parent company
      type: 'string',
      required: true
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    province: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }

};
