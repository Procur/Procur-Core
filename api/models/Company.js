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
      unique: true,
      minLength: 3,
      maxLength: 50
    },
    phoneNumberCountryCode: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 8
    },
    phoneNumber: {
      type: 'string',
      required: true,
      minLength: 5,
      maxLength: 50
    },
    phoneExtension: {
      type: 'string',
      minLength: 1,
      maxLength: 10
    },
    faxCountryCode: {
      type: 'string',
      minLength: 1,
      maxLength: 8
    },
    faxNumber: {
      type: 'string',
      minLength: 5,
      maxLength: 50
    },
    faxExtension: {
      type: 'string',
      minLength: 1,
      maxLength: 10
    },
    email: {
      type: 'email',
      required: true,
      minLength: 4,
      maxLength: 50
    },
    website: {
      type: 'string',
      minLength: 4,
      maxLength: 80
    },
    industry: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    employeeCount: {
      type: 'integer'
    },
    buyer: {
      type: 'boolean'
    },
    supplier: {
      type: 'boolean'
    },
    primaryMode: {
      type: 'string',
      minLength: 1,
      maxLength: 40
    },
    wizardComplete: {
      type: 'boolean'
    },
    handle: {
      type: 'string',
      unique: true,
      minLength: 2,
      maxLength: 50
    },

    //UTILITY

    active: {
      type: 'boolean',
      required: true
    }

  }

};
