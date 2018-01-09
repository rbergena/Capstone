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

export default class UsersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // users will be populated by the database
      users: []
    }
  }
  // after component mounts, get users data from FBDB in order to populate list
  componentDidMount(){

    this.getUsersData();
  }
  // TODO: exclude currently logged in user (use user's uid and then only add to results array if currently logged in user's uid does not equal propName)
  getUsersData(){
    const userId = firebase.auth().currentUser.uid;
    // async and await promises
    // non api call
    firebase.database().ref('/users/').once('value').then((snapshot) => {
      console.log('in component did mount')
      console.log(snapshot.val())
      let users = snapshot.val()
      let results = [];
      for(var propName in users) {
          if(users.hasOwnProperty(propName)) {
            console.log('this is the propName')
            console.log(propName)
            console.log('this is the propValue')
            console.log(users[propName])
              var propValue = users[propName];
              // propValue.uid = propName
              console.log('prop value object after adding uid key and value')
              console.log(propValue)
              if (userId === propName) {
                console.log('this is the current user')
                console.log(userId)
              } else {
              results.push(propValue)
            }
          }
      }
      // set users with result from DB
      this.setState({
        users: results,
      })
    });
  }
  // //navigate to user details page and pass selected user object
  goToUserDetails(user){
    this.props.navigate('UserDetailsFromFeed', {...user})
  }
  // eventually refactor out presentational component
  // need to display instruments from object and genres from object
  render() {
    // const { navigate } = this.props.navigation;
    console.log('state users')
    console.log(this.state.users)
    return (
      <View style={styles.container}>
        <List containerStyle={{marginTop: 0}}>
          <FlatList
            data={this.state.users}
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
                  </View>
                }
                avatar={{ uri: item.picture.thumbnail }}
                keyExtractor={item => item.uid}
                onPress={() => this.goToUserDetails({...item})}
              />
            )}
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
