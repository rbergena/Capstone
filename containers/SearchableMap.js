// Searchable Map will store state: users, searchText, and searchIndex
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
import Search from '../components/Map/Search';
// add container for map
import MapContainer from './MapContainer';



export default class FilterableUsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // users will be populated by the database
      users: [],
      searchText: '',
      // index to search markers by
      searchIndex: 1,
    }
    this.handleOnPress = this.handleOnPress.bind(this);
    this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
    // get reference to users node
    this.usersRef = firebase.database().ref().child('users/');
  }
  // after component mounts, get users data from FBDB in order to populate list
  componentDidMount() {
    this.listenForUsers(this.usersRef);
  }

  listenForUsers(usersRef){
    const userId = firebase.auth().currentUser.uid;
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
              // check if user has coordinates, name and instruments
              if(userObject.coordinates && userObject.name && userObject.instruments) {
                results.push(userObject)
              }
            }
          }
        }
        // set users with result from DB
        this.setState({
          users: results,
        })
    });
  }

  // remove listener
  componentWillUnmount() {
      this.usersRef.off()
  }

  // event handler to be passed to button
  handleOnPress(index) {
    this.setState({
      searchIndex: index,
    })
  }

  handleSubmitEditing(searchText) {
    this.setState({
      searchText: searchText
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Search
          searchText={this.state.searchText}
          searchIndex={this.state.searchIndex}
          onPress={this.handleOnPress}
          onSumbitEditing={this.handleSubmitEditing}
          onClearText={this.handleSubmitEditing}
        />
        <MapContainer
          searchText={this.state.searchText}
          searchIndex={this.state.searchIndex}
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
