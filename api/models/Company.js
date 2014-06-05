/**
 * Company
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    user: {
      type: 'string',
      required: true,  //TIES COMPANY TO USER
      unique: true
    },
  	name: {
      type: 'string',
      required: true,
      unique: true
    },
    phoneNumber: {
      type: 'string',
      required: true
    },
    phoneExtension: {
      type: 'string'
    },
    faxCountryCode: {
      type: 'string'
    },
    faxNumber: {
      type: 'string'
    },
    faxExtension: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true
    },
    website: {
      type: 'string'
    },
    industry: {
      type: 'string'
    },
    employeeCount: {
      type: 'integer',
    },
    buyer: {
      type: 'boolean',
    },
    supplier: {
      type: 'boolean',
    },
    primaryMode: {
      type: 'string'
    },
    wizardComplete: {
      type: 'boolean',
    },
    handle: {
      type: 'string',
      unique: true
    },

    //UTILITY

    active: {
      type: 'boolean',
      required: true
    }

  }

};
