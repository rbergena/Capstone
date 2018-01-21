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
  // eventually refactor out presentational component
  // need to display instruments from object and genres from object
  render() {
    // const { navigate } = this.props.navigation;
    // console.log('state users')
    // console.log(this.state.users)
    // console.log('this is this.props.user in the users list container')
    // console.log(this.props.users)
    // console.log('this is the props filterText')
    // console.log(this.props.filterText)
    // console.log('this is the props filterIndex')
    // console.log(this.props.filterIndex)
    let filteredUsers = [];
    // if filtertext is not an empty string, filter users by instrument and genre
    if(this.props.filterText !== '') {
      // filter by instrument (at index 0)
      if(this.props.filterIndex === 0) {
        this.props.users.forEach((user) => {
          // console.log('this is a user in the user lists container')
          // console.log(user)
          let userInstruments = Object.keys(user.instruments)
          // console.log('users instruments')
          // console.log(userInstruments)
          userInstruments.forEach((instrument) => {
            // if instrument matches filter text, push user into filteredUsers array
            // console.log('this is the instrument')
            // console.log(instrument)
            // console.log('this is the filter text')
            // console.log(this.props.filterText)
            if(instrument.match(this.props.filterText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })


        })
        // console.log('this is the filtered users array')
        // console.log(filteredUsers)
        // else if()
        // filter by instrument


      }
    // filter by genre (at index 1)
    else if(this.props.filterIndex === 1) {
        this.props.users.forEach((user) => {
          // console.log('this is a user in the user lists container')
          // console.log(user)
          let userGenres = Object.keys(user.genres)
          // console.log('users genres')
          // console.log(userGenres)
          userGenres.forEach((genre) => {
            // if instrument matches filter text, push user into filteredUsers array
            // console.log('this is the instrument')
            // console.log(genre)
            // console.log('this is the filter text')
            // console.log(this.props.filterText)
            if(genre.match(this.props.filterText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })

      })
      // console.log('this is the filtered users array')
      // console.log(filteredUsers)
      // else if()
      // filter by instrument

    }
  }
  // no text inputed so show all users
  else {
    Array.prototype.push.apply(filteredUsers,this.props.users)
    // filteredUsers.concat(this.props.users)
    // console.log('these are the filtered users with no search text')
    // console.log(filteredUsers)
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
  // color: '#9C7178',
  // color: '#548089'
  color: '#00171F',
},
genres: {
  // color: '#829356',
  // color: '#9C7178'
  color: '#003459',
},
});
//
// <View style={styles.icons}>
// <Image source={require('../assets/Djembe.png')}
// style={{width: 25, height: 25, marginRight: 5}}
// />
// <Image source={require('../assets/Djembe.png')}
// style={{width: 25, height: 25, marginRight: 5}}
// />
// </View>
// 128
// avatar={{ uri: item.picture.thumbnail }}
// onPress={() => this.goToUserDetails({...item})}

// { item.picture ?
//   avatar={{ uri: item.picture.thumbnail }}
//   : avatar={{ uri:  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
// }
// { item.instruments ? (
//   Object.keys(item.instruments).forEach((instrument) => {Icons(instrument)}) )
// : null
// }
// { item.instruments ? (
//   Object.keys(item.instruments).forEach((instrument) => {Icons(instrument)}) )
// : null
// }
