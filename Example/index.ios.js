/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import BTClient from 'react-native-braintree-card';

export default class Example extends Component {
  static state = {
    name: '',
    creditCard: '',
    expMonth: '',
    expYear: '',
    cvc: '',
  }

  componentDidMount() {
    BTClient.initWithAuthorization('sandbox_6r26tptf_9czv2m8zrn6tfckj');
  }

  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  sumbitForm() {
    const { name, creditCard, expMonth, expYear, cvc } = this.state;
    console.log('Sumbit Form: ', name, creditCard, expMonth, expYear, cvc);
    BTClient.getCardNonce(creditCard, expMonth, expYear)
      .then(nonce => {
        console.log('Nonce: ', nonce);
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
          onChangeText={(name) => this.setState({name})}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={styles.default}
          placeholder="Credit Card Number"
          keyboardType="numeric"
          returnKeyType="next"
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
            onChangeText={(expYear) => this.setState({expYear})}
            onSubmitEditing={() => this.focusNextField('5')}
          />
          <TextInput
            ref="5"
            style={styles.default}
            placeholder="CVC"
            returnKeyType="done"
            blurOnSubmit={false}
            onChangeText={(cvc) => this.setState({cvc})}
            onSubmitEditing={() => this.sumbitForm()}
          />
        </View>
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
});

AppRegistry.registerComponent('Example', () => Example);
