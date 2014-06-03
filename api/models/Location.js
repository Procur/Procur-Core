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
      type: 'string'
    },                //Connects relationship to buyer
    buyer: {
      type: 'string'
    },
    supplier: {
      type: 'string'
    },                //Connects relationship to supplier
    title: {
      type: 'string'
    },
    addressLine1: {
      type: 'string',
      required: true
    },
    addressLine2: {
      string
    },
    city: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    province: {
      type: 'string',
      required: true
    },
    country: {
      type: 'string',
      required: true
    },
    postalCode: {
      type: 'string',
      required: true
    },
    isHq: {
      type: 'boolean',
      required: true
    },
    type: {
      type: 'string'
    }                  // Types: HQ, Factory, Office, nearestPort, otherLocation, preferredBuyerLocation, etc
  }

};
