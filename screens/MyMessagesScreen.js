import React, { Component } from 'react';

import {
  View,
  Button,
  Text,
  StyleSheet,
  FlatList,
  Image,
 } from 'react-native';
 import { List, ListItem } from "react-native-elements"
import * as firebase from 'firebase';
import {distance} from '../config/distance';
import {Icons} from '../config/InstrumentsGenres';

export default class MyMessagesScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          chats: []
      };
      // current logged in user
      this.user = firebase.auth().currentUser;
      // get reference to chat
      this.chatRef = firebase.database().ref().child('chat/');
  }

  // listen for chats
  listenForItems(chatRef) {
    chatRef.on('value', (snap) => {
      // when chat node changes (i.e., chat is added), get a snapshot of app's users and use snapshot to identify chat partner's information
      firebase.database().ref('/users/').once('value').then((snapshot) => {
        let users = snapshot.val();
         return users
       }).then((users) => {
          // go through each chat pair key and see if the chat is for the current user
          let chatPartners = [];
          (Object.keys(snap.val())).forEach((chatPair) => {
            // if current user is a member of the chat, then add chat to messages screen
            if(chatPair.includes(this.user.uid)) {
              let chatPairIds = chatPair.split('-');
              if(chatPairIds[0] === this.user.uid) {
                chatPartners.push(users[chatPairIds[1]])
              } else {
                chatPartners.push(users[chatPairIds[0]])
              }
            }
          })
          this.setState({
            chats: chatPartners,
          });
        });
      });
    }

  // listen for new chats
  componentDidMount() {
    this.listenForItems(this.chatRef);
  }

  // stop listening for new chats
  componentWillUnmount() {
      this.chatRef.off()
  }
  // go to chat
  goToChat(user) {
    this.props.navigation.navigate('Chat', {user: user})
  }

  render() {

     return (
       <View style={styles.container}>
         <List containerStyle={{marginTop: 0}}>
           <FlatList
             data={this.state.chats}
             renderItem={({ item }) => (
               <ListItem
                 roundAvatar
                 title={item.name}
                 subtitle={
                   <View>
                     { item.genres ? (
                       <Text style={[styles.text, styles.genres]}> {Object.keys(item.genres).join(', ')}</Text> )
                       : null
                     }
                     { item.instruments ? (
                       <Text style={[styles.text, styles.instruments]}> {Object.keys(item.instruments).join(', ')}</Text> )
                       : null
                       }
                       <View style={styles.icons}>
                         { item.instruments ? (<Icons instruments={Object.keys(item.instruments)} />)
                         : null
                         }
                       </View>
                     { item.distance ? (
                       <Text style={[styles.text, styles.distance]}> {item.distance} miles away</Text> )
                       : null
                       }
                   </View>
                 }
                 avatar={
                 item.picture ? ({ uri: item.picture.thumbnail }) : ({ uri:  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' })
                }
                 onPress={() => this.goToChat(item)}
               />
             )}
             keyExtractor={item => item.uid}
           />
         </List>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 70,
   },
   text: {
     color: '#86939e',
     fontSize: 14,
     fontWeight: '600',
     marginLeft: 10,
   },
   distance: {
     textAlign: 'right',
     fontSize: 10,
   },
   icons: {
     flexDirection: 'row',
     marginLeft: 10,
     marginTop: 5,
   },
   instruments: {
     color: '#00171F',
   },
   genres: {
     color: '#003459',
   },
});
