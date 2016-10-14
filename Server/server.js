'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

app.use(bodyParser.json());

var braintree = require('braintree');

require('dotenv').load();
var gateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});

app.get("/get_token", function (req, res) {
	gateway.clientToken.generate({}, function (err, response) {
		console.log("Client Token generated and sent");
		res.send(response);
	});
});

app.post("/add-payment-method", function (req, res) {
  var name = req.body.name.split(' ');
  var firstName = name[0];
  var lastName = name[name.length - 1];
	var nonce = req.body.nonce;

	// Use payment method nonce here
	console.log("Creating payment method against nonce: ", firstName, lastName, nonce);
  gateway.customer.create({
    firstName: firstName,
    lastName: lastName
  }, function (err, result) {
    if (result.success) {
    	gateway.paymentMethod.create({
          customerId: result.customer.id,
      		paymentMethodNonce: nonce,
    	}, function (err, result) {
        if (result.success) {
      		console.log('add-payment-method created!');
        } else {
      		console.log('add-payment-method failed: ', result.message);
        }
    		res.send();
    	});
    } else {
      console.log('Error creating customer: ', result.message);
    }
  });
});

app.post("/pay", function (req, res) {
	var nonce = req.body.payment_method_nonce;

	// Use payment method nonce here
	console.log("Creating transaction against nonce: " + nonce);
	gateway.transaction.sale({
  		amount: "10.00",
  		paymentMethodNonce: nonce,
	}, function (err, result) {
		console.log("purchase result: " + result.success);
		res.send();
	});
});

app.listen(3000);
console.log('listening on port 3000...');
