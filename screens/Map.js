// List view of nearby users
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import MapView from 'react-native-maps';


export default class Map extends Component {
  render() {
    return (
      <MapView style={styles.container}
         initialRegion={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
       />

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  loginContainer: {
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
  textLink: {
    paddingVertical: 20,
    textAlign: 'center',
    color: 'gray'
  }
});
// add later
// source={require('./images/JamOutLogo.png')}
// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//   <Text>Map Screen</Text>
// </View>
