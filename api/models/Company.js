/**
 * Company
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

  	name: {
      type: 'string',
      required: true
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
    email: {
      type: 'string',
      required: true
    },
    website: {
      type: 'string'
    },
    physicalAddress1: {
      type: 'string',
      required: 'true'
    },
    physicalAddress2: {
      type: 'string'
    },
    country: {
      type: 'string',
      required: 'true'
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
    }

  }

};
