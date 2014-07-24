/**
* Download.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    owner: { //ID of the buyer or supplier that owns this download
      type: 'string',
      required: true
    },

    title: {
      type: 'string',
      required: true,
      maxLength: 50
    },

    assetUrl: {
      type: 'string',
      unique: true//,
      //required: true //just commented out for testing til downloading works
    }

  }
};
