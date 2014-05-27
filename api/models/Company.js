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
    physicalAddress1: {
      type: 'string',
      required: true
    },
    physicalAddress2: {
      type: 'string'
    },
    country: {
      type: 'string',
      required: true
    },
    province: {
      type: 'string',
      required: true
    },
    postalCode: {
      type: 'string',
      required: true
    },
    hqAddress1: {
      type: 'string'
    },
    hqAddress2: {
      type: 'string'
    },
    hqCountry: {
      type: 'string'
    },
    hqProvince: {
      type: 'string'
    },
    hqPostalCode: {
      type: 'string'
    },
    companyType: {
      type: 'string',
      required: true
    },
    industry: {
      type: 'string'
    },
    employeeCount: {
      type: 'integer',
      required: true
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
