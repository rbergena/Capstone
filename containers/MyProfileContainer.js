// import component
import React, { Component } from 'react';
import { View,
          ScrollView,
        } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { FormLabel, FormInput, Avatar } from 'react-native-elements'
// import dropdown choices for instruments and genres
import { instruments, genres } from '../config/InstrumentsGenres';
import * as firebase from 'firebase';

export default class MultiSelectGenresInstruments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInstruments: [],
      selectedGenres: [],
      avatar: '',
    }
  }
  // set selected items to whatever is in DB for that user if there are instruments and genres. Otherwise selected genres and instruments state will be empty arrays
  // set state with already selected instruments
  componentDidMount(){
    // TODO MAKE ONE CALL TO FB AND SET STATE FOR ALL PIECES
    console.log(`######### MY PROFILE CONTAINER'S componentDidMount ##############`)
    // this.setState({
    //   selectedInstruments: ['Djembe', 'Flute']
    // });
    // this.onSelectedInstrumentsChange;
    let instrumentsResults = {};
    let genresResults = {};

    const userId = firebase.auth().currentUser.uid;
    // firebase.database().ref('/users/' + userId + '/instruments').once('value').then(function(snapshot) {
    firebase.database().ref('/users/' + userId + '/instruments').once('value').then((snapshot) => {
      console.log('*******IN THE FIREBASE CALL INSTRUMENTS IN PROFILE PAGE ********')
      // if the instrument node exists, set the state of selected instruments to those currently in the DB
      // if(snapshot.val()) {
        console.log('it returned a snapshot')
        console.log(snapshot.val());
        console.log('these are the snapshot instrument keys')
        let instrumentsObject = snapshot.val();
        console.log(Object.keys(instrumentsObject))
        instrumentsResults['selectedInstruments'] = Object.keys(instrumentsObject);

        console.log('this is the results object')
        console.log(instrumentsResults);
        // set state with instruments in DB
        this.setState(instrumentsResults);
        console.log('this is the selectedInstruments state after pulling from DB')
        console.log(this.state.selectedInstruments)
    });
    firebase.database().ref('/users/' + userId + '/genres').once('value').then((snapshot) => {
      console.log('*******IN THE FIREBASE CALL GENRES IN PROFILE PAGE ********')
      // if the instrument node exists, set the state of selected instruments to those currently in the DB
      // if(snapshot.val()) {
        console.log('it returned a snapshot')
        console.log(snapshot.val());
        console.log('these are the snapshot instrument keys')
        let genresObject = snapshot.val();
        console.log(Object.keys(genresObject))
        genresResults['selectedGenres'] = Object.keys(genresObject);

        console.log('this is the results object')
        console.log(genresResults);
        // set state with genres in DB
        this.setState(genresResults);
        console.log('this is the selectedGenres state after pulling from DB')
        console.log(this.state.selectedGenres)
    });
    firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
      let user = snapshot.val();
      this.setState({avatar: user.picture.large})
  });
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
  // TODO conditionally set source uri
  render() {
    console.log(`######### IN MY PROFILE CONTAINER'S RENDER ##############`)
    console.log('selected items')
    console.log(this.state.selectedInstruments)
    const { selectedInstruments } = this.state;
    const { selectedGenres } = this.state;

    console.log('this is the multiselect')
    console.log(this.multiSelect);
    // debugger
    return (
      <View style={{ flex: 1, marginTop: 50 }}>
      <ScrollView>
      <Avatar
        xlarge
        rounded
        source={{uri: this.state.avatar}}
        activeOpacity={0.7}
        containerStyle={{marginTop: 30, justifyContent: 'center'}}
      />
      <FormLabel>Name</FormLabel>
      <FormInput onChangeText={() => console.log('form input changed')}/>
      <FormLabel>Email</FormLabel>
      <FormInput onChangeText={() => console.log('form input changed')}/>
      <FormLabel>Description</FormLabel>
      <FormInput onChangeText={() => console.log('form input changed')}/>
      <FormLabel>Social Media</FormLabel>
      <FormInput onChangeText={() => console.log('form input changed')}/>
        <ScrollView>
        <MultiSelect
          hideTags
          items={genres}
          uniqueKey="genre"
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

        <ScrollView>

          <MultiSelect
            hideTags
            items={instruments}
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
          </ScrollView>

      </View>
    );
  }
}
// TODO: add selected items to DB and remove items from DB
// <View>
//   {this.multiSelect.getSelectedItemsExt(selectedItems)}
// </View>
