import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
export default class UsersFeedScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text>This is the My Profile screen of the app</Text>
      </View>
     )
   }
}
