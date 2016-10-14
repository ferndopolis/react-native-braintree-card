import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity
} from 'react-native';

import BTClient from 'react-native-braintree-card';

export default class Example extends Component {
  state = {
    name: '',
    creditCard: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  }

  componentDidMount() {
    fetch('http://localhost:3000/get_token', {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        var clientToken = responseData.clientToken;
        console.log('Server responseData: ', responseData);
        BTClient.initWithAuthorization(clientToken);
      });
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  sumbitForm() {
    const { name, creditCard, expMonth, expYear, cvc } = this.state;
    console.log('Sumbit Form: ', name, creditCard, expMonth, expYear, cvc);
    BTClient.getCardNonce({
      number: creditCard,
      expirationMonth: expMonth,
      expirationYear: expYear,
      cvv: cvc,
      cardholderName: 'Tee Zee Bee',

      billing_address: {
        street_address: '123 Cools Street',
        postal_code: '12341',
        locality: 'Los Angeles',
        region: 'California',
        country_code_alpha2: 'US',
        country_name: 'United States of America',
      },

      options: {
        validate: false,
      }
    })
    // BTClient.getCardNonce(creditCard, expMonth, expYear, cvc)
      .then(nonce => {
        console.log('Nonce: ', nonce);
        fetch('http://localhost:3000/add-payment-method', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nonce: nonce,
            name: name
          })
        });
      })
      .catch(err => {
        console.log('ERROR with payment: ', err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="1"
          style={styles.default}
          placeholder="Name"
          returnKeyType="next"
          blurOnSubmit={false}
          value={this.state.name}
          onChangeText={(name) => this.setState({name})}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={styles.default}
          placeholder="Credit Card Number"
          keyboardType="numeric"
          returnKeyType="next"
          value={this.state.creditCard}
          blurOnSubmit={false}
          onChangeText={(creditCard) => this.setState({creditCard})}
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <View style={styles.row}>
          <TextInput
            ref="3"
            style={styles.default}
            placeholder="Month"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            value={this.state.expMonth}
            onChangeText={(expMonth) => this.setState({expMonth})}
            onSubmitEditing={() => this.focusNextField('4')}
          />
          <TextInput
            ref="4"
            style={[styles.default, {marginRight: 40}]}
            placeholder="Year"
            keyboardType="numeric"
            returnKeyType="next"
            blurOnSubmit={false}
            value={this.state.expYear}
            onChangeText={(expYear) => this.setState({expYear})}
            onSubmitEditing={() => this.focusNextField('5')}
          />
          <TextInput
            ref="5"
            style={styles.default}
            placeholder="CVC"
            returnKeyType="done"
            blurOnSubmit={false}
            value={this.state.cvc}
            onChangeText={(cvc) => this.setState({cvc})}
            onSubmitEditing={() => this.sumbitForm()}
          />
        </View>
        <TouchableOpacity
          onPress={this.sumbitForm.bind(this)}
          style={styles.button}
        >
          <Text style={styles.text}>Sumbit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
  },
  default: {
    height: 26,
    borderWidth: 1,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('Example', () => Example);
