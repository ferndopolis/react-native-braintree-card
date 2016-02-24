'use strict';

var RNBraintreeCard = require('react-native').NativeModules.RNBraintreeCard;

var BraintreeCard = {
    initWithAuthorization(clientToken) {
        RNBraintreeCard.initWithAuthorization(clientToken);
    },

    getCardNonce(cardNumber, expirationMonth, expirationYear, cvv, callback) {
        RNBraintreeCard.getCardNonce(cardNumber, expirationMonth, expirationYear, cvv, callback);
    }
};

module.exports = BraintreeCard;
