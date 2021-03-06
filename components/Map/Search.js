import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ButtonGroup, SearchBar} from "react-native-elements"

const Instruments = () => <Text style={styles.instruments}>Instruments</Text>
const Genres = () => <Text style={styles.genres}>Genres</Text>

export default class Search extends React.Component {

  constructor(props) {
  super(props);
  this.handlePress = this.handlePress.bind(this);
  this.handleSubmitEditing = this.handleSubmitEditing.bind(this);
  this.handleOnClearText=this.handleOnClearText.bind(this);
}

  handlePress(searchIndex) {
    this.props.onPress(searchIndex)
  }
  // pass search text to onSubmitEditing prop which calls handleSubmitEditing in parent which sets state to current text in search
  handleSubmitEditing(text) {
    this.props.onSumbitEditing(text);
  }
  // clear text should repopulate map with markers
  handleOnClearText() {
    this.props.onSumbitEditing('');
  }

  render() {
    const searchText = this.props.searchText;
    const searchIndex = this.props.searchIndex;
    const buttons = [{ element: Instruments }, { element: Genres }]

    return (
      <View>
      <ButtonGroup
        onPress={this.handlePress}
        selectedIndex={this.props.searchIndex}
        buttons={buttons}
        containerStyle={{height: 50}}
        selectedBackgroundColor='#9CAFB7'
      />
      <SearchBar
        round
        onSubmitEditing
        ={(event) => this.handleSubmitEditing(event.nativeEvent.text)}
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
    color: '#00171F',
    fontWeight: 'bold',
  },
  genres: {
    color: '#003459',
    fontWeight: 'bold',
  },
});
