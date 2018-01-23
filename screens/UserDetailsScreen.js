import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import UserProfileContainer from '../containers/UserProfileContainer'

export default class UserDetailScreen extends React.Component {
  // pass state.params as prop to container  which can then show individual user's information
  // pass navigate to userprofile container which will then pass it to the social media component so that you can navigate between profile and social media webview
  render() {
    const {state} = this.props.navigation;
    return (
        <UserProfileContainer userInfo={state.params} navigate={ this.props.navigation.navigate}/>
     )
   }
}
