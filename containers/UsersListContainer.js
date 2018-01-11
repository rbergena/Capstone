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
import {distance} from '../config/distance'

export default class UsersListContainer extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   // users will be populated by the database
    //   users: []
    // }
  }
  // // after component mounts, get users data from FBDB in order to populate list
  // componentDidMount(){
  //
  //   this.getUsersData();
  // }
  //
  // getUsersData(){
  //   const userId = firebase.auth().currentUser.uid;
  //   // async and await promises
  //   // non api call
  //   firebase.database().ref('/users/').once('value').then((snapshot) => {
  //     console.log('in component did mount')
  //     console.log(snapshot.val())
  //     let users = snapshot.val()
  //     let results = [];
  //     let currentUser = [];
  //     for(var uid in users) {
  //         if(users.hasOwnProperty(uid)) {
  //           console.log('this is the uid')
  //           console.log(uid)
  //           console.log('this is the uid object')
  //           console.log(users[uid])
  //             var userObject = users[uid];
  //             // propValue.uid = propName
  //             // console.log('prop value object after adding uid key and value')
  //             console.log('this is the user object')
  //             console.log(userObject)
  //               // exclude currently logged in user (use user's uid and then only add to results array if currently logged in user's uid does not equal the userObject's uid)
  //             if (userId === uid) {
  //               console.log('this is the current user')
  //               currentUser.push(userObject)
  //               console.log('user id')
  //               console.log(userId)
  //               console.log('current user object')
  //               console.log(currentUser[0])
  //             } else {
  //             results.push(userObject)
  //           }
  //         }
  //     }
  //     // calculate distance between current user and other users
  //     let dist = 0;
  //     results.forEach((user) => {
  //       console.log(`this is the current user's coordinates`)
  //       console.log(currentUser[0].coordinates)
  //       console.log(`this is the user you are comparing with's coordinates`)
  //       console.log(user.coordinates)
  //       dist = distance(currentUser[0].coordinates.latitude, currentUser[0].coordinates.longitude, user.coordinates.latitude, user.coordinates.longitude)
  //       console.log('this is the distance')
  //       console.log(dist)
  //       //
  //       user['distance'] = dist.toFixed(2)
  //       console.log('this is the updated user object with distance')
  //       console.log(user)
  //     });
  //     // sort resulting musicians in ascending order by distance
  //     results.sort(function(a, b) {
  //       return a.distance - b.distance;
  //     });
  //     console.log('these are the musicians after sorting')
  //     console.log(results)
  //     // set users with result from DB
  //     this.setState({
  //       users: results,
  //     })
  //   });
  // }
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
    console.log('this is this.props.user in the users list container')
    console.log(this.props.users)
    console.log('this is the props filterText')
    console.log(this.props.filterText)
    console.log('this is the props filterIndex')
    console.log(this.props.filterIndex)
    let filteredUsers = [];
    // if filtertext is not an empty string, filter users by instrument and genre
    if(this.props.filterText !== '') {
      // filter by instrument (at index 0)
      if(this.props.filterIndex === 0) {
        this.props.users.forEach((user) => {
          console.log('this is a user in the user lists container')
          console.log(user)
          let userInstruments = Object.keys(user.instruments)
          console.log('users instruments')
          console.log(userInstruments)
          userInstruments.forEach((instrument) => {
            // if instrument matches filter text, push user into filteredUsers array
            console.log('this is the instrument')
            console.log(instrument)
            console.log('this is the filter text')
            console.log(this.props.filterText)
            if(instrument.match(this.props.filterText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })


        })
        console.log('this is the filtered users array')
        console.log(filteredUsers)
        // else if()
        // filter by instrument


      }
    // filter by genre (at index 1)
    else if(this.props.filterIndex === 1) {
        this.props.users.forEach((user) => {
          console.log('this is a user in the user lists container')
          console.log(user)
          let userGenres = Object.keys(user.genres)
          console.log('users genres')
          console.log(userGenres)
          userGenres.forEach((genre) => {
            // if instrument matches filter text, push user into filteredUsers array
            console.log('this is the instrument')
            console.log(genre)
            console.log('this is the filter text')
            console.log(this.props.filterText)
            if(genre.match(this.props.filterText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })

      })
      console.log('this is the filtered users array')
      console.log(filteredUsers)
      // else if()
      // filter by instrument

    }
  }
  // no text inputed so show all users
  else {
    Array.prototype.push.apply(filteredUsers,this.props.users)
    // filteredUsers.concat(this.props.users)
    console.log('these are the filtered users with no search text')
    console.log(filteredUsers)
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
                      <Text style={styles.text}>Genres: {Object.keys(item.genres).join(', ')}</Text> )
                      : null
                    }
                    { item.instruments ? (
                    <Text style={styles.text}>Instruments: {Object.keys(item.instruments).join(', ')}</Text> )
                    : null
                    }
                    { item.distance ? (
                    <Text style={styles.text}> {item.distance} miles away</Text> )
                    : null
                    }
                  </View>
                }
                avatar={{ uri: item.picture.thumbnail }}
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
}
});

// <FlatList
//   data={this.state.users}
//   renderItem={({item}) =>
//    <Text style={styles.item}>
//   {item.name}
//   {item.uid}
//   </Text>}
// />
// subtitle={Object.getOwnPropertyNames((object) =>{ [k].join(' ')})}
// onPress={() => navigate('UserDetails', {...item})}
