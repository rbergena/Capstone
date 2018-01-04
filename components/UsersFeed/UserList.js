// User Profile Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { List, ListItem, SocialIcon } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

const list = [
  {
    title: 'Appointments',
    icon: 'av-timer'
  },
  {
    title: 'Trips',
    icon: 'flight-takeoff'
  },
]


export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    // initially there are no users
    // users will populate from firebase call that fetches users
    // after component mounts
    this.state = {
      users: [],
    }
  }

    // fetch users from firebase DB after component mounts
    componentDidMount

// add on press prop for social icons that will then go to webview
  render() {
    return (
      <View style={styles.container}>

      <List>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{name: item.icon}}
            />
          ))
        }
      </List>
      <View style={styles.socialContainer}>
        <SocialIcon
          raised={false}
          type='soundcloud'
        />
        <SocialIcon
        type='twitter'
        />
        <SocialIcon
          light
          type='youtube'
        />
        <SocialIcon
          light
          type='instagram'
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
  },
  socialContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  loginContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: 'rgb(189, 195, 199)',
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  textLink: {
    paddingVertical: 20,
    textAlign: 'center',
    color: 'gray'
  }
});
// add later
// source={require('./images/JamOutLogo.png')}
