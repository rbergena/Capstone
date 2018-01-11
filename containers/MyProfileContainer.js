// import component
import React, { Component } from 'react';
import { View,
          ScrollView,
          KeyboardAvoidingView,
          StyleSheet,
          ActivityIndicator,
        } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { FormLabel, FormInput, Avatar,           Button } from 'react-native-elements'
// import dropdown choices for instruments and genres
import { instruments, genres } from '../config/InstrumentsGenres';
import * as firebase from 'firebase';

export default class MultiSelectGenresInstruments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedInstruments: [],
      selectedGenres: [],
      avatar: '',
      // name: '',
      // email: '',
      // description: '',
    }
  }
  // set selected items to whatever is in DB for that user if there are instruments and genres. Otherwise selected genres and instruments state will be empty arrays
  // set state with already selected instruments
  componentDidMount(){
    // TODO MAKE ONE CALL TO FB AND SET STATE FOR ALL PIECES
    this.setState({ loading: true });
    console.log(`######### MY PROFILE CONTAINER'S componentDidMount ##############`)

    const userId = firebase.auth().currentUser.uid;
    // get users information from user/uid node
      firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
        console.log('*******IN THE FIREBASE CALL USER/UID IN PROFILE PAGE ********')
        // if the instrument node exists, set the state of selected instruments to those currently in the DB
        // if(snapshot.val()) {
        // TODO first check if node exists, if not then don't change selected instruments or genres
          console.log('it returned a snapshot')
          console.log(snapshot.val());
          let currentUserObject = snapshot.val();
          let instrumentsObject =  Object.keys(currentUserObject.instruments)
          console.log('this is the instruments object')
          console.log(instrumentsObject)
          let genresObject = Object.keys(currentUserObject.genres)
          console.log('this is the genres object')
          console.log(genresObject)
          let name = '';
          let email = '';
          let description ='';
          // if node exists, change state to value in DB, otherwise leave as empty string
          if(currentUserObject.name) {
            name = currentUserObject.name
          }
          if(currentUserObject.email) {
            email = currentUserObject.email
          }
          if(currentUserObject.description) {
            description = currentUserObject.description
          }
          // get user name, email, description
          this.setState({
            selectedInstruments: instrumentsObject,
            selectedGenres: genresObject,
            name: name,
            email: email,
            avatar: currentUserObject.picture.large,
            description: description,
            loading: false,
          })
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
  nameChange(text) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId + '/name').set(
      text
    )
  }
  emailChange(text) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId + '/email').set(
      text
    )
  }
  descriptionChange(text) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId + '/description').set(
      text
    )
  }


  // TODO conditionally set source uri
  render() {
    console.log(`######### IN MY PROFILE CONTAINER'S RENDER ##############`)
    console.log('selected items')
    console.log(this.state.selectedInstruments)
    const { selectedInstruments } = this.state;
    const { selectedGenres } = this.state;
    console.log('this is the loading state')
    console.log(this.state.loading)
    console.log('this is the multiselect')
    console.log(this.multiSelect);
    // debugger
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
        </View>
      )
    } else {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View style={styles.avatarContainer}>
      <Avatar
        xlarge
        rounded
        source={{uri: this.state.avatar}}
        activeOpacity={0.7}
        containerStyle={{marginTop: 30, justifyContent: 'center'}}
      />
      </View>
      <Button
      raised
      small
      icon={{name: 'link', type: 'font-awesome'}}
      title='BUTTON WITH ICON' />
      <FormLabel>Name</FormLabel>
      <FormInput
      placeholder= 'Please enter your name...'
      onChangeText={(text) => this.nameChange(text)}
      defaultValue={this.state.name}
      />
      <FormLabel>Email</FormLabel>
      <FormInput
      placeholder= 'Please enter your email...'
      onChangeText={(text) => this.emailChange(text)}
      defaultValue={this.state.email}
      />
      <FormLabel>Description</FormLabel>
      <FormInput
      placeholder= 'Please enter a description...'
      containerStyle={styles.input}
      multiline={true}
      onChangeText={(text) => this.descriptionChange(text)}
      defaultValue={this.state.description}
      />
      <FormLabel>Social Media</FormLabel>
      <FormInput
      onChangeText={() => console.log('form input changed')}
      defaultValue='add'
      />
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

          </KeyboardAvoidingView>

    );
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
  minHeight: 100,
  // backgroundColor: '#fff',
  // marginHorizontal: 10,
  // marginVertical: 5,
 // paddingVertical: 5,
  // paddingHorizontal: 15,
  // width: window.width - 30,
},
horizontal: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10
},
avatarContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingBottom: 20,

}
});
// TODO: add selected items to DB and remove items from DB
// <View>
//   {this.multiSelect.getSelectedItemsExt(selectedItems)}
// </View>
