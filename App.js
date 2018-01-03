/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Login from './components/Login/Login';
import LoginForm from './components/Login/LoginForm';
import CreateAccountForm from './components/CreateAccount/CreateAccountForm';
import firebaseApp from './services/firebase';
import * as firebase from 'firebase';
import { SignInStack } from './config/Router.js'


export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <SignInStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
  },
});

// <LoginForm/>
// <View style={styles.container}>
//   <CreateAccountForm/>
// </View>
