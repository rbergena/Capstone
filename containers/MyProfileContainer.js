// import component
import React, { Component } from 'react';
import { View,
          ScrollView,
        } from 'react-native';
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
  }, {
    id: 'Flusdfgte',
    name: 'Flsdfute',
  }, {
    id: 'Flsdfsdfute',
    name: 'Flsdfsdfute',
  }, {
    id: 'Fludsasddsdsfsdte',
    name: 'Fldsfsdfute',
  }, {
    id: 'Flutdfasdsde',
    name: 'Flusdfsdfte',
  }, {
    id: 'Flsafdussaddfsdte',
    name: 'Flutesdfsdf',
  }, {
    id: 'Flsaddussaddfsdte',
    name: 'Flutesdfsdf',
  }, {
    id: 'Flsaduffssaddfsdte',
    name: 'Flutesdfsdf',
  }, {
    id: 'Flsadudssaddfsdte',
    name: 'Flutesdfsdf',
  }, {
    id: 'Flsadussasdfsddfsdte',
    name: 'Flutesdfsdf',
  }, {
    id: 'Flsadusfsaddfsdte',
    name: 'Flutesdfsdf',
  }, {
    id: 'Flsadusssdfsdaddfsdte',
    name: 'Flutesdfsdf',
  }


];

export default class MultiSelectExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInstruments: [],
      selectedGenres: [],
    }
  }
  // set selected items to whatever is in DB if there are instruments and genres else selected genres and instruments state will be empty array
  // set state with already selected instruments
  componentDidMount(){
    this.setState({
      selectedInstruments: ['Djembe', 'Flute']
    });
    // this.onSelectedInstrumentsChange;
  }
  onSelectedInstrumentsChange = selectedInstruments => {
    this.setState({ selectedInstruments });
    // when selected items change, write over DB instruments values
    // first find the current user's uid
    const user = firebase.auth().currentUser
    console.log('this is the current user');
    console.log(user)
    console.log(`this is the current user's uid`);
    console.log(user.uid)
    const userId = user.uid;

    console.log('these are the selected items in the callback');
    console.log(selectedInstruments);
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
      selectedInstruments.forEach((instrument) => {
        results[instrument] = true
      });
      console.log('these are the results')
      console.log(results);
      firebase.database().ref('users/' + userId + '/instruments').set(
        results
      )
  };

  onSelectedGenresChange = selectedGenres => {
    this.setState({ selectedGenres });
    // when selected items change, write over DB instruments values
    // first find the current user's uid
    const user = firebase.auth().currentUser
    console.log('this is the current user');
    console.log(user)
    console.log(`this is the current user's uid`);
    console.log(user.uid)
    const userId = user.uid;

    console.log('these are the selected items in the callback');
    console.log(selectedGenres);
      let results = {};
      selectedGenres.forEach((genre) => {
        results[genre] = true
      });
      console.log('these are the results')
      console.log(results);
      firebase.database().ref('users/' + userId + '/genres').set(
        results
      )
  };
  render() {
    console.log('selected items')
    console.log(this.state.selectedInstruments)
    const { selectedInstruments } = this.state;
    const { selectedGenres } = this.state;

    console.log('this is the multiselect')
    console.log(this.multiSelect);
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
      <ScrollView>

        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedInstrumentsChange}
          selectedItems={selectedInstruments}
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
          fixedHeight={false}
        />
        </ScrollView>

        <ScrollView>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedGenresChange}
          selectedItems={selectedGenres}
          selectText="Pick Genres"
          searchInputPlaceholderText="Search Genres..."
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
          fixedHeight={false}
        />
        </ScrollView>
      </View>
    );
  }
}
// TODO: add selected items to DB and remove items from DB
// <View>
//   {this.multiSelect.getSelectedItemsExt(selectedItems)}
// </View>
