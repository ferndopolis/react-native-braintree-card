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
    cvv: '',
    street_address: '',
    postal_code: '',
    locality: '',
    region: '',
    alert: '',
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
    const { name, creditCard, expMonth, expYear, cvv,
    street_address, postal_code, locality, region } = this.state;
    console.log('Sumbit Form: ', name, creditCard, expMonth, expYear, cvv);
    BTClient.getCardNonce({
      number: creditCard,
      expirationMonth: expMonth,
      expirationYear: expYear,
      cvv,
      cardholderName: name,

      billing_address: {
        street_address, postal_code, locality, region,
        country_code_alpha2: 'US',
        country_name: 'United States of America',
      },

      options: {
        validate: false,
      }
    })
    // BTClient.getCardNonce(creditCard, expMonth, expYear, cvv)
      .then(nonce => {
        this.setState({alert: `Nonce: ${nonce}`});
        fetch('http://localhost:3000/add-payment-method', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nonce: nonce,
            name: name
          })
        })
        .then((response) => response.json())
        .then(res => {
          this.setState({alert: res.message});
        });
      })
      .catch(err => {
        console.log('ERROR with payment: ', err);
        this.setState({alert: err});
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
            placeholder="cvv"
            returnKeyType="done"
            blurOnSubmit={false}
            value={this.state.cvv}
            onChangeText={(cvv) => this.setState({cvv})}
            onSubmitEditing={() => this.focusNextField('6')}
          />
        </View>
        <Text>Billing Address: </Text>
        <TextInput
          ref="6"
          style={styles.default}
          placeholder="Address"
          returnKeyType="done"
          blurOnSubmit={false}
          value={this.state.street_address}
          onChangeText={(street_address) => this.setState({street_address})}
          onSubmitEditing={() => this.focusNextField('7')}
        />
        <View style={styles.row}>
          <TextInput
            ref="7"
            style={styles.default}
            placeholder="City"
            returnKeyType="done"
            blurOnSubmit={false}
            value={this.state.locality}
            onChangeText={(locality) => this.setState({locality})}
            onSubmitEditing={() => this.focusNextField('8')}
          />
          <TextInput
            ref="8"
            style={styles.default}
            placeholder="State"
            returnKeyType="done"
            blurOnSubmit={false}
            value={this.state.locality}
            onChangeText={(locality) => this.setState({locality})}
            onSubmitEditing={() => this.focusNextField('9')}
          />
          <TextInput
            ref="9"
            style={styles.default}
            placeholder="Zip"
            returnKeyType="done"
            blurOnSubmit={false}
            value={this.state.postal_code}
            onChangeText={(postal_code) => this.setState({postal_code})}
            onSubmitEditing={() => this.sumbitForm()}
          />
        </View>
        <TouchableOpacity
          onPress={this.sumbitForm.bind(this)}
          style={styles.button}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.alert}>{this.state.alert}</Text>
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
  },
  alert: {
    marginTop: 20,
    color: 'blue',
  }
});

AppRegistry.registerComponent('Example', () => Example);
