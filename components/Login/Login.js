// login screen

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import * as firebase from 'firebase';
// import firebaseApp from './services/firebase';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='email'
          onSumbitEditing={() => this.passwordInput.focus()}
          returnKeyType='next'
          keyboardType='email-address'
          autoCapitalize='none'

          autoCorrect={false}
          />
        <TextInput
          style={styles.input}
          placeholder='password'
          secureTextEntry
          returnKeyType='go'
          ref={(input) => this.passwordInput = input}
          />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}> Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: 'rgb(189, 195, 199)',
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
});
// onChangeText={(text) => this.setState({email: text})}
// value={this.state.email}
