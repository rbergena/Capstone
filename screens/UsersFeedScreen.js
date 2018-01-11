import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import UsersListContainer from '../containers/UsersListContainer'
import FilterableUsersTable from '../containers/FilterableUsersTable'


export default class UsersFeedScreen extends React.Component {
  render() {

    return (
        <FilterableUsersTable navigate={ this.props.navigation.navigate}/>
     )
   }
}

// <UsersListContainer navigate={ this.props.navigation.navigate}/>
