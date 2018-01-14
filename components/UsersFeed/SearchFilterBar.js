import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ButtonGroup, SearchBar} from "react-native-elements"


export default class SearchFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handlePress(filterIndex) {
    this.props.onPress(filterIndex)
  }
  // pass search text to onFilterTextChange prop which calls handle filter text change in parent which sets state to current text in search
  handleFilterTextChange(text) {
  this.props.onFilterTextChange(text);
  }

  render() {
    const filterText = this.props.filterText;
    const filterIndex = this.props.filterIndex;
    const buttons = ['Instruments', 'Genres']
    console.log('onFilterTextChange editing')
    console.log(this.props.onFilterTextChange)
    return (
      <View>
      <ButtonGroup
        onPress={this.handlePress}
        selectedIndex={this.props.filterIndex}
        buttons={buttons}
        containerStyle={{height: 50}}
        selectedBackgroundColor="pink"
      />
      <SearchBar
        round
        onChangeText={(text) => {this.handleFilterTextChange(text)}}
        onClearText={() => {console.log('text cleared')}}
        placeholder='Search' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
