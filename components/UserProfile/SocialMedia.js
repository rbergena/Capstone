// Social Media Component
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
  // when a social icon is pressed, navigate to appropriate webview
  goToWebView(uri, userhandle, socialName, user) {
    console.log('this is the url produced');
    console.log(uri + userhandle);
    const finalURI = uri + userhandle;
    this.props.navigate('SocialMediaWebView', {finalURI, socialName, user})
  }
  // conditionally display icons
  render() {
    const {userName} = this.props;

    return (
        <View style={styles.socialContainer}>
        { this.props.links.soundcloud ? (
          <SocialIcon
            raised={false}
            type='soundcloud'
            onPress={() => this.goToWebView(SOUNDCLOUD, this.props.links.soundcloud, 'SoundCloud', userName)}
            onLongPress={() => this.goToWebView(SOUNDCLOUD, this.props.links.soundcloud, 'SoundCloud', userName)}
          />
        ) : null}
        {this.props.links.twitter ? (
          <SocialIcon
          type='twitter'
          onPress={() => this.goToWebView(TWITTER, this.props.links.twitter, 'twitter', userName)}
          onLongPress={() => this.goToWebView(TWITTER, this.props.links.twitter, 'twitter', userName)}
          />
        ) : null}
        {this.props.links.youtube ? (
          <SocialIcon
            light
            type='youtube'
            onPress={() => this.goToWebView(YOUTUBE, this.props.links.youtube, 'youtube', userName)}
          />
        ): null}
        {this.props.links.instagram ? (
          <SocialIcon
            light
            type='instagram'
            onPress={() => this.goToWebView(INSTAGRAM, this.props.links.instagram, 'instagram', userName)}
            onLongPress={() => this.goToWebView(INSTAGRAM, this.props.links.instagram, 'instagram', userName)}
          />
        ): null}

        </View>

    );
  }
}

const styles = StyleSheet.create({
  socialContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// {isLoggedIn ? (
//    <LogoutButton onClick={this.handleLogoutClick} />
//  ) : (
//    <LoginButton onClick={this.handleLoginClick} />
//  )}
