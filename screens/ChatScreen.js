import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Stylesheet,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

import * as firebase from 'firebase';

export default class ChatScreen extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        // current logged in user
        this.user = firebase.auth().currentUser;
        this.recipient = this.props.navigation.state.params.user
        this.chatRef = firebase.database().ref().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);
    }

  // generate a unique key for the chat pair
  generateChatId() {
      if(this.user.uid > this.recipient.uid)
          return `${this.user.uid}-${this.recipient.uid}`
      else
          return `${this.recipient.uid}-${this.user.uid}`
  }

  getRef() {
      return firebase.database().ref();
  }

  listenForItems(chatRef) {
    firebase.database().ref('/users/' + this.user.uid).once('value').then((snapshot) => {
      let currentUser = snapshot.val()
       return currentUser
     }).then((currentUser) => {
        chatRef.on('value', (snap) => {
          // get children as an array
          var items = [];
          snap.forEach((child) => {
            var avatar = child.val().uid == this.user.uid? currentUser.picture.thumbnail : this.recipient.picture.thumbnail;
            var name = child.val().uid == this.user.uid? currentUser.name: this.recipient.name
            items.push({
                _id: child.val().createdAt,
                text: child.val().text,
                createdAt: new Date(child.val().createdAt),
                user: {
                    _id: child.val().uid,
                    name: name,
                    avatar: avatar,
                }
            });
          });
          this.setState({
              loading: false,
              messages: items
          })
        })
      });
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.listenForItems(this.chatRefData);
  }

  componentWillUnmount() {
      this.chatRefData.off()
  }

  onSend(messages = []) {
    messages.forEach(message => {
        var now = new Date().getTime()
        this.chatRef.push({
            _id: now,
            text: message.text,
            createdAt: now,
            uid: this.user.uid,
            order: -1 * now
        })
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
        </View>
      )
    }
    else {
      return (
        <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend.bind(this)}
            user={{
                _id: this.user.uid,
            }}
            showUserAvatar={true}
            isLoadingEarlier={true}
            bottomOffset={56}
            />
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
