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

     //UTILITY

     active: {
       type:'boolean',
       required: 'true'
     }
   }

 };


/*module.exports = {

  attributes: {

    company: {
      type: 'string',
      required: true,
      unique: true
    },
  	productionVolume: {
      type: 'integer',
      required: true
    },
    primaryProducts: {
      type: 'string',
    },
    capabilities: {
      type: 'string'
    },
    mainMarkets: {
      type: 'integer'
    },
    approximateDistribution: {
      type: 'integer'
    },
    preferredBuyerType: {
      type: 'string',
      required: true
    },
    factoryAddress1: {
      type: 'string'
    },
    factoryAddress2: {
      type: 'string'
    },
    factoryCountry: {
      type: 'string'
    },
    factoryProvince: {
      type: 'string'
    },
    factoryPostalCode: {
      type: 'string'
    },
    contractManufacturing: { //ASK ABOUT THIS
      type: 'boolean'
    },
    factorySize: {
      type: 'string' //ASK ABOUT THIS
    },
    qualityControlStaffCount: {
      type: 'integer'
    },
    annualOutputValue: {
      type: 'integer'
    },
    coreProductDetails: {
      type: 'text'
    },
    gsaApprovedSupplier: {
      type: 'boolean' //ASK ABOUT THIS
    },
    cageCode: {
      type: 'string'
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

    //UTILITY

    active: {
      type: 'boolean',
      required: true
    }
  }

};*/
