'use strict';

var RNBraintreeCard = require('react-native').NativeModules.RNBraintreeCard;

var BraintreeCard = {
    initWithAuthorization(clientToken) {
        RNBraintreeCard.initWithAuthorization(clientToken);
    },

    addCard(cardNumber, expirationMonth, expirationYear, cvv, callback) {
        RNBraintreeCard.addCard(cardNumber, expirationMonth, expirationYear, cvv, callback);
    }
};

module.exports = BraintreeCard;
