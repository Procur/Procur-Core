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
    annualSalesValue: {
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
    facebook: {
      type: 'string'
    },
    twitter: {
      type: 'string'
    },
    pinterest: {
      type: 'string'
    },
    tumblr: {
      type: 'string'
    },
    linkedin: {
      type: 'string'
    },
    instagram: {
      type: 'string'
    },
    google: {
      type: 'string'
    },
    relevantLinkTitle: {
      type: 'array'
    },
    relevantLinkUrl: {
      type: 'array'
    },
    dunsNumber: {
      type: 'string'
    },
    contactName: {
      type: 'string'
    },
    contactPosition: {
      type: 'string'
    },
    contactEmail: {
      type: 'string'
    },
    companyDescription: {
      type: 'string'
    },
    downloadTitle: {
      type: 'array'
    },
    downloadFile: {
      type: 'array'
    },
    photo: {
      type: 'array'
    },
    environmentalSustainability: {
      type: 'string'
    },
    qualitySourcing: {
      type: 'string'
    },
    workplaceSafety: {
      type: 'string'
    },
    laborEducationTraining: {
      type: 'string'
    },
    reinvestment: {
      type: 'string'
    },
    companyCapabilities: {
      type: 'string'
    },
    asia: {
      type: 'string'
    },
    africa: {
      type: 'integer'
    },
    northAmerica: {
      type: 'integer'
    },
    centralAmerica: {
      type: 'integer'
    },
    carribean: {
      type: 'integer'
    },
    southAmerica: {
      type: 'integer'
    },
    westEurope: {
      type: 'integer'
    },
    eastEurope: {
      type: 'integer'
    },
    oceania: {
      type: 'integer'
    },
    australia: {
      type: 'integer'
    },
    totalFactorySize: {
      type: 'string'
    },
    totalQCStaff: {
      type: 'string'
    },
    coreProductDetails: {
      type: 'string'
    },
    gsaApprovedSupplier: {
      type: 'string'
    },
    cageCode: {
      type: 'string'
    }



    //UTILITY

    active: {
      type:'boolean',
      required: 'true'
    }
  }

 };
