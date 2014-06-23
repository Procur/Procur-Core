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
      minLength: 1,
      maxLength: 100
    },
    buyer: {          //Connects relationship to buyer
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    supplier: {       //Connects relationship to supplier
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    addressLine1: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    addressLine2: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    city: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    province: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    country: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    postalCode: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    isHq: {
      type: 'boolean'
    },
    type: {           // Types: HQ, Factory, Office, nearestPort, otherLocation, preferredBuyerLocation, etc
      type: 'string',
      minLength: 1,
      maxLength: 100
    }
  }

};