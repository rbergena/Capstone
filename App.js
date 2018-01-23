/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import CreateAccountForm from './components/CreateAccount/CreateAccountForm';
import firebaseApp from './services/firebase';
import * as firebase from 'firebase';
import { SignInStack, RootNavigator } from './config/Router.js'

console.disableYellowBox = true;
export default class App extends Component<{}> {
  render() {
    return (
      <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <RootNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
// <SignInStack />

// <LoginForm/>
// <View style={styles.container}>
//   <CreateAccountForm/>
// </View>
