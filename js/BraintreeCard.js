'use strict';

var RNBraintreeCard = require('react-native').NativeModules.RNBraintreeCard;

var BraintreeCard = {
    initWithAuthorization: function(clientToken) {
        RNBraintreeCard.initWithAuthorizaiton(clientToken);
    }

    addCard: function(card, expirationMonth, expirationYear, ccs, callback) {
        RNBraintreeCard.addCard(card, expirtationMonth, expirationYear, ccv, callback);
    }
};

module.exports = BraintreeCard;
