// UsersList Container Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import { List, ListItem } from "react-native-elements"
import * as firebase from 'firebase';
import {distance} from '../config/distance';
import {Icons} from '../config/InstrumentsGenres';

export default class UsersListContainer extends Component {
  constructor(props) {
    super(props);
  }
  // //navigate to user details page and pass selected user object
  goToUserDetails(user){
    this.props.navigate('UserDetailsFromFeed', {...user})
  }

  render() {
    let filteredUsers = [];
    // if filtertext is not an empty string, filter users by instrument and genre
    if(this.props.filterText !== '') {
      // filter by instrument (at index 0)
      if(this.props.filterIndex === 0) {
        this.props.users.forEach((user) => {
          let userInstruments = Object.keys(user.instruments)
          userInstruments.forEach((instrument) => {
            // if instrument matches filter text, push user into filteredUsers array
            if(instrument.match(this.props.filterText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })
        })
      }
      // filter by genre (at index 1)
      else if(this.props.filterIndex === 1) {
          this.props.users.forEach((user) => {
            let userGenres = Object.keys(user.genres)
            userGenres.forEach((genre) => {
              // if genre matches filter text, push user into filteredUsers array
              if(genre.match(this.props.filterText)) {
                filteredUsers.push(user)
                // move to next user
                return
              }
            })
        })
      }
    }
    // no text inputed so show all users
    else {
      Array.prototype.push.apply(filteredUsers,this.props.users)
    }

    return (
      <View style={styles.container}>
        <List containerStyle={{marginTop: 0}}>
          <FlatList
            data={filteredUsers}
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
                onPress={() => this.goToUserDetails({...item})}
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
