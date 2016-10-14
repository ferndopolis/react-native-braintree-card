'use strict';

var RNBraintreeCard = require('react-native').NativeModules.RNBraintreeCard;

var BraintreeCard = {
  initWithAuthorization(clientToken) {
    return new Promise(function(resolve, reject) {
      RNBraintreeCard.initWithAuthorization(clientToken, function(success) {
        success === true ? resolve(true) : reject('Invalid Token');
      });
    })

  },

  getCardNonce(cardNumber, expirationMonth, expirationYear, cvv, callback) {
    return new Promise( function(resolve, reject) {
      RNBraintreeCard.getCardNonce(cardNumber, expirationMonth, expirationYear, cvv, function(err, nonce) {
        nonce != null ? resolve(nonce) : reject(err);
      });
    })
  }
};

module.exports = BraintreeCard;
