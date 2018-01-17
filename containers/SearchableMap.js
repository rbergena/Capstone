// Filterable Product Table will store state: users, searchText, and filterBy
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

  }
  // after component mounts, get users data from FBDB in order to populate list
  componentWillMount(){
    this.getUsersData();
  }

  getUsersData(){
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/').once('value').then((snapshot) => {
      console.log('#######MAPCONTAINER GETUSER DATA#############')
      console.log('in component did mount')
      console.log(snapshot.val())
      let users = snapshot.val()
      let results = [];
      let currentUser = [];
      for(var uid in users) {
          if(users.hasOwnProperty(uid)) {
            console.log('this is the uid')
            console.log(uid)
            console.log('this is the uid object')
            console.log(users[uid])
              var userObject = users[uid];
              console.log('this is the user object')
              console.log(userObject)
                // exclude currently logged in user (use user's uid and then only add to results array if currently logged in user's uid does not equal the userObject's uid)
              if (userId === uid) {
                console.log('this is the current user')
                currentUser.push(userObject)
                console.log('user id')
                console.log(userId)
                console.log('current user object')
                console.log(currentUser[0])
              } else {
              results.push(userObject)
            }
          }
      }
      console.log('these are the musicians after pulling all but current user from DB')
      console.log(results)
      // set users with result from DB
      this.setState({
        users: results,
      })
    });
  }
  // event handler to be passed to button
  handleOnPress(index) {
    this.setState({
      searchIndex: index,
    })
    console.log('in the handle on press in searchable')
  }

  handleSubmitEditing(searchText) {
    this.setState({
      searchText: searchText
    });
    console.log('in the handle submit editing in searchable map')
  }

  render() {
    console.log('this is this.state.users')
    console.log(this.state.users)
    console.log('this is the search index')
    console.log(this.state.searchIndex)
    console.log('this is the search text')
    console.log(this.state.searchText)
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
