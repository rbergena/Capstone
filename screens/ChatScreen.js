import React, { Component } from 'react';
// TODO: add and import child component
import {
    View,
    Text,
    Button,
    Stylesheet,
} from 'react-native';
import * as firebase from 'firebase';


export default class ChatScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        // current logged in user
        this.user = firebase.auth().currentUser
        // this.friend = this.props.friend
        // this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        // this.chatRefData = this.chatRef.orderByChild('order')
        // this.onSend = this.onSend.bind(this);

    }
  render() {
    console.log(' props in chat screen')
    console.log(this.props.navigation.params)
    console.log(this.props.navigation.params.user.uid)

    return (
        <View>
        <Text> Chat Screen </Text>
        </View>
     )
   }
}
