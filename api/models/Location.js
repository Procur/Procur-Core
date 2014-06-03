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
      type: 'string'
      //previously required
    },
    addressLine2: {
      type: 'string',
    },
    city: {
      type: 'string'
    },
    province: {
      type: 'string'
      //previously required
    },
    country: {
      type: 'string'
      //previously required
    },
    postalCode: {
      type: 'string'
      //previously required
    },
    isHq: {
      type: 'boolean'
      //previously required
    },
    type: {
      type: 'string'
    }                  // Types: HQ, Factory, Office, nearestPort, otherLocation, preferredBuyerLocation, etc
  }

};
