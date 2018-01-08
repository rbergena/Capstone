// import component
import React, { Component } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import * as firebase from 'firebase';

const items = [{
    id: 'Piano',
    name: 'Piano',
  }, {
    id: 'Trumpet',
    name: 'Trumpet',
  }, {
    id: 'Trombone',
    name: 'Trombone',
  }, {
    id: 'Violin',
    name: 'Violin',
  }, {
    id: 'Djembe',
    name: 'Djembe',
  }, {
    id: 'Triangle',
    name: 'Triangle',
  }, {
    id: 'Drums',
    name: 'Drums',
  }, {
    id: 'Cymbals',
    name: 'Cymbals',
  }, {
    id: 'Flute',
    name: 'Flute',
  }];

export default class MultiSelectExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    // when selected items change, write over DB instruments values
    // first find the current user's uid
    const user = firebase.auth().currentUser
    console.log('this is the current user');
    console.log(user)
    console.log(`this is the current user's uid`);
    console.log(user.uid)
    const userId = user.uid;

    console.log('these are the selected items in the callback');
    console.log(selectedItems);
    // selectedItems is an array of selected instruments (iterate through)
    // ISSUE: this only results in the latest instrument being added to the database... maybe need listener on this.state.selected items and then update when this changes?
    // BECAUSE set writes over the DB node completely
    // selectedItems.forEach((instrument) => {
    //   firebase.database().ref('users/' + userId + '/instruments').set({
    //     [instrument]: true,
    //   });
    // });
      // firebase.database().ref('users/' + userId + '/instruments').set({
      //   selectedItems.forEach((instrument) => {
      //     [instrument]: true,
      //   });
      // });
      let results = {};
      selectedItems.forEach((instrument) => {
        results[instrument] = true
      });
      console.log('these are the results')
      console.log(results);
      firebase.database().ref('users/' + userId + '/instruments').set(
        results
      )
  };

  render() {
    console.log('selected items')
    console.log(this.state.selectedItems)
    const { selectedItems } = this.state;
    console.log('this is the multiselect')
    console.log(this.multiSelect);
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Instruments"
          searchInputPlaceholderText="Search Instruments..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          hideTags={false}
        />

      </View>
    );
  }
}
// TODO: add selected items to DB and remove items from DB
// <View>
//   {this.multiSelect.getSelectedItemsExt(selectedItems)}
// </View>
