import React, { Component } from 'react';
import SearchableMap from '../containers/SearchableMap'


export default class MapScreen extends React.Component {
  render() {

    return (
        <SearchableMap navigate={ this.props.navigation.navigate}/>
     )
   }
}
