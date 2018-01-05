import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

export default class UserDetailScreen extends React.Component {
  // pass state.params as prop to container  which can then show individual user's information
  render() {
    const {state} = this.props.navigation;
    console.log('navigation state params')
    console.log(state.params)
    return (
      <View>
        <Text>This is the User Details screen of the app {state.params.name}</Text>
      </View>
     )
   }
}
