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
    preferredSupplierType: {
      type: 'string',
      minLength: 1,
      maxLength: 100
    },
    preferredSupplierLanguage: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    preferredSupplierLocation: {
      type: 'array',
      minLength: 0, //not required
      maxLength: 100
    },
    typeOfCompany: {
      type: 'string',
      minLength: 1,
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
    productCategory: {
      type: 'array'//TODO: question for will
    },
    productsOfInterest: {
      type: 'string'//TODO: question for will
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
      maxLength: 100
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
      maxLength: 100
    },

    //UTILITY

    active: {
      type:'boolean',
      required: 'true'
    }
  }

};
