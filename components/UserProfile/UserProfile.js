// User Profile Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { List, ListItem, SocialIcon, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    }
// add on press prop for social icons that will then go to webview
// try hard coded with a uid hardcoded from DB and pull information
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Tile
          imageSrc={{ uri: 'https://randomuser.me/api/portraits/women/7.jpg'}}
          featured
          title= 'full name'
          caption= 'email address'
        />
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
        <List>
          <ListItem
            title="Email"
            rightTitle= 'email'
            hideChevron
          />
          <ListItem
            title="City, State"
            rightTitle='city, state'
            hideChevron
          />
        </List>


        <List>
          <ListItem
            title='Description'
            rightTitle='description'
            hideChevron
          />
        </List>

        <List>
          <ListItem
            title='Instruments'
            rightTitle='instruments'
            hideChevron
          />
          <ListItem
            title='genres'
            rightTitle='genres'
            hideChevron
          />
        </List>
      </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
