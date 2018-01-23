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
  // after component mounts, get users data from FBDB in order to populate list and listen for changes to users node
  componentDidMount() {
    this.listenForUsers(this.usersRef);
  }

  listenForUsers(usersRef){
    const userId = firebase.auth().currentUser.uid;
    // listen for changes to users node
    usersRef.on('value', (snapshot) => {
      let users = snapshot.val()
      let results = [];
      let currentUser = [];
      for(var uid in users) {
          if(users.hasOwnProperty(uid)) {
              var userObject = users[uid];
              // exclude currently logged in user (use user's uid and then only add to results array if currently logged in user's uid does not equal the userObject's uid)
              if (userId === uid) {
                currentUser.push(userObject)
              } else {
              results.push(userObject)
            }
          }
      }
      // calculate distance between current user and other users
      let dist = 0;
      let finalUsers = [];
      // set user's location to current lat long then pass to dist calculation with .then
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
          results.forEach((user) => {
          // if current user has provided coordinates, use those otherwise get coordinates and set then compare
          // only add users if they have the following information
          if(user.coordinates && user.name && user.instruments) {
            dist = distance(currentUser[0].coordinates.latitude, currentUser[0].coordinates.longitude, user.coordinates.latitude, user.coordinates.longitude)
            user['distance'] = dist.toFixed(2)
            finalUsers.push(user)
          }
      });
      // sort resulting musicians in ascending order by distance
      finalUsers.sort(function(a, b) {
        return a.distance - b.distance;
      });
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
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  render() {
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
