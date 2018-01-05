import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import UsersListContainer from '../containers/UsersListContainer'

export default class UsersFeedScreen extends React.Component {
  render() {
    // const {navigate} = this.props.navigation;

    return (
        <UsersListContainer navigate={ this.props.navigation.navigate}/>
     )
   }
}
