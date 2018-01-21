import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ButtonGroup, SearchBar} from "react-native-elements"

const Instruments = () => <Text style={styles.instruments}>Instruments</Text>
const Genres = () => <Text style={styles.genres}>Genres</Text>

export default class SearchFilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleOnClearText=this.handleOnClearText.bind(this);
  }

  handlePress(filterIndex) {
    this.props.onPress(filterIndex)
  }
  // pass search text to onFilterTextChange prop which calls handle filter text change in parent which sets state to current text in search
  handleFilterTextChange(text) {
  this.props.onFilterTextChange(text);
  }

  // clear text should repopulate list with users
  handleOnClearText() {
    // console.log('text cleared')
    this.props.onFilterTextChange('');
  }

  render() {
    const filterText = this.props.filterText;
    const filterIndex = this.props.filterIndex;
    // const buttons = ['Instruments', 'Genres']
    const buttons = [{ element: Instruments }, { element: Genres }]
    // console.log('onFilterTextChange editing')
    // console.log(this.props.onFilterTextChange)
    return (
      <View>
      <ButtonGroup
        onPress={this.handlePress}
        selectedIndex={this.props.filterIndex}
        buttons={buttons}
        containerStyle={{height: 50}}
        selectedBackgroundColor='#9CAFB7'
      />
      <SearchBar
        round
        onChangeText={(text) => {this.handleFilterTextChange(text)}}
        onClearText={this.handleOnClearText}
        placeholder='Search'
        clearIcon={{name: 'clear'}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  instruments: {
    // color: '#9C7178',
    // color: '#548089'
    color: '#00171F',
    fontWeight: 'bold',
  },
  genres: {
    // color: '#829356',
    // color: '#9C7178'
    color: '#003459',
    fontWeight: 'bold',
  },
});
