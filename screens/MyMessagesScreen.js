import React, { Component } from 'react';
// TODO: add and import child component
import { View, Button, Text } from 'react-native';

export default class MyMessagesScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>My Messages Screen</Text>
        <Button onPress={() => this.props.navigation.navigate('Chat')}title="Go to chat" />
        </View>
     )
   }
}
