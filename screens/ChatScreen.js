import React, { Component } from 'react';
// TODO: add and import child component
import {
    View,
    Text,
    Button,
    Stylesheet,
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
        // this.getCurrentUser();
        this.user = firebase.auth().currentUser;
        this.recipient = this.props.navigation.state.params.user
        // this.chatRef = this.getRef().child('chat/' + this.generateChatId());
        this.chatRef = firebase.database().ref().child('chat/' + this.generateChatId());
        this.chatRefData = this.chatRef.orderByChild('order')
        this.onSend = this.onSend.bind(this);

    }
  //   componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //         },
  //       },
  //     ],
  //   })
  // }

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
  // getCurrentUser() {
  //   const userId = firebase.auth().currentUser.uid
  //   let currentUser = [];
  //   return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
  //     console.log('this is the user snapshot')
  //     console.log(snapshot.val())
  //     return snapshot.val()
  //     // currentUser.push(snapshot.val())
  //   }).then((user)=> {
  //     this.user = user;
  //   })
  //   // return currentUser[0];
  //   // .then((user) => {
  //   //   console.log('this is the passed user snapshot')
  //   //   console.log(user)
  //   //   return user
  //   // })
  //
  // }

  listenForItems(chatRef) {
    firebase.database().ref('/users/' + this.user.uid).once('value').then((snapshot) => {
       console.log('this is the user snapshot')
       console.log(snapshot.val())
         let currentUser = snapshot.val()
      //  currentUser.push(snapshot.val())
       return currentUser
     }).then((currentUser) => {
        chatRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                var avatar = child.val().uid == this.user.uid? currentUser.picture.thumbnail : this.recipient.picture.thumbnail;
                var name = child.val().uid == this.user.uid? currentUser.name: this.recipient.name
                console.log(' chat name and avatar')
                console.log(name)
                console.log(avatar)
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
    this.listenForItems(this.chatRefData);
}

componentWillUnmount() {
    this.chatRefData.off()
}

onSend(messages = []) {

    // this.setState({
    //     messages: GiftedChat.append(this.state.messages, messages),
    // });
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
    console.log('props in chat screen')
    // the user's params including uid are passed down to the chat screen
    console.log(this.props.navigation.state.params)
    console.log('this is the current user')
    console.log(this.user)
    console.log('this is the recipient')
    console.log(this.recipient)
    console.log('chat ref')
    console.log(this.chatRef)
    return (
    <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{
            _id: this.user.uid,
        }}
        showUserAvatar={true}
        />
);
  }
}
//   render() {
//     console.log(' props in chat screen')
//     console.log(this.props.navigation.params)
//     // console.log(this.props.navigation.params.user.uid)
//
//     return (
//         <View>
//         <Text> Chat Screen </Text>
//         </View>
//      )
//    }
// }
