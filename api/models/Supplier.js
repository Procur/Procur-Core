/**
 * Supplier
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

 /**
  * Buyer
  *
  * @module      :: Model
  * @description :: A short summary of how this model works and what it represents.
  * @docs		:: http://sailsjs.org/#!documentation/models
  */

 module.exports = {

  attributes: {

    company: {
      type: 'string',
      required: 'true',
      unique: true
    },
    dbaName: {
      type: 'string'
    },
    companyLogo: {
      type: 'string'
    },
    language: {
      type: 'array'
    },
    annualProductionVolume: {
      type: 'string'
    },
    primaryProductSpeciality: {
      type: 'array'
    },
    preferredBuyerType: {
      type: 'string'
    },
    preferredBuyerLanguage: {
      type: 'array'
    },
    preferredBuyerCountry: {
      type: 'array'
    },
    acceptedDeliveryTerms: {
      type: 'string'
    },
    acceptedCurrency: {
      type: 'string'
    },
    acceptedPaymentTerms: {
      type: 'string'
    },
    typeOfCompany: {
      type: 'string'
    },
    privateLabeler: {
      type: 'boolean'
    },

    //UTILITY

    active: {
      type:'boolean',
      required: 'true'
    }
  }

 };
