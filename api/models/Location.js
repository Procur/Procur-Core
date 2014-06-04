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
    },
    buyer: {          //Connects relationship to buyer
      type: 'string'
    },
    supplier: {       //Connects relationship to supplier
      type: 'string'
    },
    title: {
      type: 'string'
    },
    addressLine1: {
      type: 'string'
    },
    addressLine2: {
      type: 'string',
    },
    city: {
      type: 'string'
    },
    province: {
      type: 'string'
    },
    country: {
      type: 'string'
    },
    postalCode: {
      type: 'string'
    },
    isHq: {
      type: 'boolean'
    },
    type: {           // Types: HQ, Factory, Office, nearestPort, otherLocation, preferredBuyerLocation, etc
      type: 'string'
    }
  }

};