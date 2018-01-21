// Filterable Product Table will store state: users, searchText, and filterBy
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
import SearchFilterBar from '../components/UsersFeed/SearchFilterBar';
import UsersListContainer from './UsersListContainer';



export default class FilterableUsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // users will be populated by the database
      users: [],
      filterText: '',
      // filterBy: 'Instruments'
      // index to filter list by
      filterIndex: 1
    }
    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    // get reference to users node
    this.usersRef = firebase.database().ref().child('users/');
  }
  // after component mounts, get users data from FBDB in order to populate list
  // componentWillMount(){
  //
  //   this.getUsersData();
  // }
  componentDidMount() {
    this.listenForUsers(this.usersRef);
  }
  listenForUsers(usersRef){
    const userId = firebase.auth().currentUser.uid;
    // async and await promises
    // non api call
    // listen for changes to users node
//     var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
// starCountRef.on('value', function(snapshot) {
//   updateStarCount(postElement, snapshot.val());
// });
    usersRef.on('value', (snapshot) => {
      // console.log('in component did mount')
      // console.log(snapshot.val())
      let users = snapshot.val()
      let results = [];
      let currentUser = [];
      for(var uid in users) {
          if(users.hasOwnProperty(uid)) {
            // console.log('this is the uid')
            // console.log(uid)
            // console.log('this is the uid object')
            // console.log(users[uid])
              var userObject = users[uid];
              // propValue.uid = propName
              // console.log('prop value object after adding uid key and value')
              // console.log('this is the user object')
              // console.log(userObject)
                // exclude currently logged in user (use user's uid and then only add to results array if currently logged in user's uid does not equal the userObject's uid)
              if (userId === uid) {
                // console.log('this is the current user')
                currentUser.push(userObject)
                // console.log('user id')
                // console.log(userId)
                // console.log('current user object')
                // console.log(currentUser[0])
              } else {
              results.push(userObject)
            }
          }
      }
      // calculate distance between current user and other users
      let dist = 0;
      let finalUsers = [];
      // if(!currentUser[0].coordinates) {
      // set user's location to current lat long
      // TODO MAKE THIS A PROMISE ONCE THE VALUES ARE SET THEN PASS TO DIST CALCULATION WITH .THEN
      let lat = 0;
      let long = 0;
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          firebase.database().ref('users/' + userId + '/coordinates').set({
            latitude: lat,
            longitude: long,
            })
            currentUser[0].coordinates = {
              latitude: lat,
              longitude: long,
            }
        }).then(() => {
        // currentUser[0].coordinates = {
        //   latitude: lat,
        //   longitude: long,
        // }
      // }
      results.forEach((user) => {
        // console.log(`this is the current user's coordinates`)
        // if current user has provided coordinates, use those otherwise get coordinates and set then compare




        // console.log(currentUser[0].coordinates)
        // console.log(`this is the user you are comparing with's coordinates`)
        // only add users if they have the following information
        if(user.coordinates && user.name && user.instruments) {
          // console.log(user.coordinates)
          dist = distance(currentUser[0].coordinates.latitude, currentUser[0].coordinates.longitude, user.coordinates.latitude, user.coordinates.longitude)
          // console.log('this is the distance')
          // console.log(dist)
          //
          user['distance'] = dist.toFixed(2)
          // console.log('this is the updated user object with distance')
          // console.log(user)
          finalUsers.push(user)

        }

      });
      // sort resulting musicians in ascending order by distance
      // results.sort(function(a, b) {
      //   return a.distance - b.distance;
      // });
      finalUsers.sort(function(a, b) {
        return a.distance - b.distance;
      });
      // console.log('these are the musicians after sorting')
      // console.log(finalUsers)
      // set users with result from DB
      this.setState({
        users: finalUsers,
      })
    });
    })
  }

  // remove listener
  componentWillUnmount() {
      this.usersRef.off()
  }
  // event handler to be passed to button
  handleOnPress(index) {
    this.setState({
      filterIndex: index,
    })
    // console.log('in the handle on press in filterable')
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
    // console.log('in the handle on filter text change in filterable')
  }

  render() {
    // console.log('this is this.state.users')
    // console.log(this.state.users)
    // console.log('this is the filter index')
    // console.log(this.state.filterIndex)
    // console.log('this is the filter text')
    // console.log(this.state.filterText)
    return(
      <View style={styles.container}>
      <SearchFilterBar
        filterText={this.state.filterText}
        filterIndex={this.state.filterIndex}
        onPress={this.handleOnPress}
        onFilterTextChange={this.handleFilterTextChange}
      />
      <UsersListContainer
        filterText={this.state.filterText}
        filterIndex={this.state.filterIndex}
        navigate={this.props.navigate}
        users={this.state.users}
      />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
