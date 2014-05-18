/**
 * Supplier
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

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
    }
  }

};
