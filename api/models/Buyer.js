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
    logoUrl: {
      type: 'string'
    },
    language: {
      type: 'array'
    },
    preferredSupplierType: {
      type: 'string'
    },
    preferredSupplierLanguage: {
      type: 'array'
    },
    preferredSupplierLocation: {
      type: 'array'
    },
    typeOfCompany: {
      type: 'string'
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
    productCategory: {
      type: 'array'
    },
    productsOfInterest: {
      type: 'string'
    },

    //UTILITY

    active: {
      type:'boolean',
      required: 'true'
    }
    


    /* DEPRECATED */
    /*
    preferredSupplierType: {
      type: 'string',
      required: true
    },
    productCategories: {
      type: 'string'
    },
    productsOfInterest: {
      type: 'text'
    },

    //SHARED ATTRIBUTES

    facebookUsername: {
      type: 'string'
    },
    twitterUsername: {
      type: 'string'
    },
    pintrestUsername: {
      type: 'string'
    },
    tumblrUsername: {
      type: 'string'
    },
    linkedinUsername: {
      type: 'string'
    },
    instagramUsername: {
      type: 'string'
    },
    googleUsername: {
      type: 'string'
    },
    relevantLinksTitle: {
      type: 'string'
    },
    languages: {
      type: 'string',
      required: true
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
    responsibilityStatement: {
      type: 'text'
    },
    aboutCompany: {
      type: 'text'
    },
    downloads: {
      type: 'string'
    },
    logoUrl: {
      type: 'string'
    },
    featuredPhotos: {
      type: 'string'
    },
    certifications: {
      type: 'string'
    },
    */
  }

};
