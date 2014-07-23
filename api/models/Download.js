/**
* Download.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    owner: { //ID of the buyer or supplier that owns this download
      type: 'string'
    },

    title: {
      type: 'string'
    },

    assetUrl: {
      type: 'string',
      unique: true
    }

  }
};