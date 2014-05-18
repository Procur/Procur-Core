/**
 * Buyer
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    preferredSupplierType: {
      type: 'string',
      required: true
    },
    productCategories: {
      type: 'string'
    },
    productsOfInterest: {
      type: 'text'
    }
  }

};
