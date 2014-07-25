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
      type: 'string',
      minLength: 3,
      maxLength: 50
    },
    logoUrl: {
      type: 'string'
    },
    language: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    annualSalesValue: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    primaryProductSpecialty: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    productCategory: {
      type: 'array'
    },
    preferredBuyerType: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    preferredBuyerLanguage: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    preferredBuyerLocation: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    acceptedDeliveryTerms: {
      type: 'array',
      minLength: 0,
      maxLength: 100
    },
    acceptedCurrency: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    acceptedPaymentTerms: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    typeOfCompany: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    privateLabeler: {
      type: 'boolean'
    },
    facebook: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    twitter: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    pinterest: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    tumblr: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    linkedin: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    instagram: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    google: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    relevantLinkTitle: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    relevantLinkUrl: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    dunsNumber: {
      type: 'string',
      minLength: 9,
      maxLength: 9
    },
    contactName: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    contactPosition: {
      type: 'string',
      minLength: 1,
      maxLength: 50
    },
    contactEmail: {
      type: 'string',
      minLength: 4,
      maxLength: 50
    },
    companyDescription: {
      type: 'string',
      minLength: 1,
      maxLength: 5000
    },
    productDescription: {
      type: 'string',
      minLength: 1,
      maxLength: 5000
    },
    downloadTitle: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    downloadFile: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    photo: {
      type: 'array',
      minLength: 1,
      maxLength: 100
    },
    environmentalSustainability: {
      type: 'string',
      minLength: 1,
      maxLength: 2000
    },
    qualitySourcing: {
      type: 'string',
      minLength: 1,
      maxLength: 2000
    },
    workplaceSafety: {
      type: 'string',
      minLength: 1,
      maxLength: 2000
    },
    laborEducationTraining: {
      type: 'string',
      minLength: 1,
      maxLength: 2000
    },
    reinvestment: {
      type: 'string',
      minLength: 1,
      maxLength: 2000
    },
    companyCapabilities: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    asia: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    africa: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    northAmerica: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    centralAmerica: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    carribean: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    southAmerica: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    westEurope: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    eastEurope: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    oceania: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    australia: {
      type: 'integer',
      minLength: 1,
      maxLength: 100
    },
    totalFactorySize: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    totalQCStaff: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    coreProductDetails: {
      type: 'string',
      minLength: 1,
      maxLength: 2000
    },
    gsaApprovedSupplier: {
      type: 'boolean'
    },
    cageCode: {
      type: 'string',
      minLength: 5,
      maxLength: 5
    },

    //Location fields
    portCity: {
      type: 'string',
      minLength: 2,
      maxLength: 50
    },
    portProvince: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    portCountry: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    locationName: {
      type: 'array',
      minLength: 0, //not required
      //Note: *array* min length of 0; length of string checked in client-side valdation
      maxLength: 50
    },
    locationType: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    locationCountry: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    locationProvince: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    locationCity: {
      type: 'array',
      minLength: 0, //not required
      //Note: *array* min length of 0; length of string checked in client-side valdation
      maxLength: 50
    },



    //UTILITY

    active: {
      type:'boolean',
      required: 'true'
    },
    getDuns: function() {
      if (this.dunsNumber === undefined) {
        return undefined;
      }
      return this.dunsNumber.substring(0,2)+"-"+this.dunsNumber.substring(2,5)+"-"+this.dunsNumber.substring(5,9);
    }
  }

 };
