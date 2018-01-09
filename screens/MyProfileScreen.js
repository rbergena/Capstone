import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import MultiSelectGenresInstruments from '../containers/MyProfileContainer';

export default class MyProfileScreen extends React.Component {
  render() {
    return (
      <MultiSelectGenresInstruments/>
    )
   }
}

// <View>
//   <Text>This is the My Profile screen of the app</Text>
// </View>
