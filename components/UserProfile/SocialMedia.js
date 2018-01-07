// User Profile Component
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SocialIcon } from 'react-native-elements'

const SOUNDCLOUD = "https://soundcloud.com/";
// youtube check add username
const YOUTUBE = "https://www.youtube.com/embed?listType=user_uploads&list=";
const TWITTER = "https://twitter.com/";
const INSTAGRAM = "https://instagram.com/";

// stateless component or functional component
// social media component receives social media links as props from user profile container
export default class SocialMedia extends Component {
  constructor(props) {
    super(props);
    // this.goToWebView = this.goToWebView.bind(this);
  }

  // navigate to webview based on which icon user pressed
  goToWebView(uri, userhandle) {
    console.log('this is the url produced');
    console.log(uri + userhandle);
    const finalURI = uri + userhandle;
    this.props.navigate('SocialMediaWebView', {finalURI})

  }
// add on press prop for social icons that will then go to webview
// try hard coded with a uid hardcoded from DB and pull information
// conditionally display icons
  render() {
    return (
        <View style={styles.socialContainer}>
        { this.props.links.soundcloud ? (
          <SocialIcon
            raised={false}
            type='soundcloud'
            onPress={() => this.goToWebView(SOUNDCLOUD, this.props.links.soundcloud)}
          />
        ) : null}
        {this.props.links.twitter ? (
          <SocialIcon
          type='twitter'
          onPress={() => this.goToWebView(TWITTER, this.props.links.twitter)}
          />
        ) : null}
        {this.props.links.youtube ? (
          <SocialIcon
            light
            type='youtube'
            onPress={() => this.goToWebView(YOUTUBE, this.props.links.youtube)}
          />
        ): null}
        {this.props.links.instagram ? (
          <SocialIcon
            light
            type='instagram'
            onPress={() => this.goToWebView(INSTAGRAM, this.props.links.instagram)}
          />
        ): null}

        </View>

    );
  }
}

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
  },
});

// {isLoggedIn ? (
//    <LogoutButton onClick={this.handleLogoutClick} />
//  ) : (
//    <LoginButton onClick={this.handleLoginClick} />
//  )}
