import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import firebaseApp from './services/firebase';
import * as firebase from 'firebase';
import { RootNavigator } from './config/Router.js'

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
