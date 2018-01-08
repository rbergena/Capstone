import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import LoginContainer from '../containers/LoginContainer'

export default class LoginScreen extends React.Component {
  render() {

    return (
        <LoginContainer navigate={ this.props.navigation.navigate}/>
     )
   }
}
