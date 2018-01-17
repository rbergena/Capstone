// import component
import React, { Component } from 'react';
import { View,
          ScrollView,
          KeyboardAvoidingView,
          StyleSheet,
          ActivityIndicator,
          AlertIOS,
          TouchableOpacity,
          Text,
          Platform,
          Image
        } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { FormLabel, FormInput, Avatar, Button, List, listItem, SocialIcon, Icon } from 'react-native-elements'
// import dropdown choices for instruments and genres
import { instruments, genres } from '../config/InstrumentsGenres';
import * as firebase from 'firebase';
var ImagePicker = require('react-native-image-picker');

// before uploading image to firebase storage, we need to convert it to the blob format (required for firebase image storage)
import RNFetchBlob from 'react-native-fetch-blob';
// fetch variables needed to convert image to blob
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

// options for image picker
var options = {
  title: 'Select Profile Picture',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class MultiSelectGenresInstruments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // selectedInstruments: [],
      // selectedGenres: [],
      // avatar: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      soundcloud: '',
      twitter: '',
      instagram: '',
      youtube: '',
      name: '',
      email: '',
      description: '',
    }
    this.showImagePicker = this.showImagePicker.bind(this);
    this.youtubePressed = this.youtubePressed.bind(this);
    this.instagramPressed = this.instagramPressed.bind(this);
    this.twitterPressed = this.twitterPressed.bind(this);
    this.soundcloudPressed = this.soundcloudPressed.bind(this);



  }
  // set selected items to whatever is in DB for that user if there are instruments and genres. Otherwise selected genres and instruments state will be empty arrays
  componentDidMount(){
    this.setState({ loading: true });
    console.log(`######### MY PROFILE CONTAINER'S componentDidMount ##############`)

    const userId = firebase.auth().currentUser.uid;
    // get users information from user/uid node
      firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
        console.log('*******IN THE FIREBASE CALL USER/UID IN PROFILE PAGE ********')
        let instrumentsObject = [];
        let genresObject = [];
        let avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        // if the instrument node exists, set the state of selected instruments to those currently in the DB
          console.log('it returned a snapshot')
          console.log(snapshot.val());
          let currentUserObject = snapshot.val();
          // if instruments or genres exist
          if(currentUserObject.instruments) {
            instrumentsObject =  Object.keys(currentUserObject.instruments)
          }
          console.log('this is the instruments object')
          console.log(instrumentsObject)
          if(currentUserObject.genres) {
            genresObject = Object.keys(currentUserObject.genres)
          }
          console.log('this is the genres object')
          console.log(genresObject)
          let name = '';
          let email = '';
          let description = '';
          let twitter = '';
          let instagram = '';
          let soundcloud = '';
          let youtube = '';
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
          if(currentUserObject.social_media) {
            if(currentUserObject.social_media.twitter) {
              twitter = currentUserObject.social_media.twitter;
            }
            if(currentUserObject.social_media.youtube) {
              youtube = currentUserObject.social_media.youtube;
            }
            if(currentUserObject.social_media.instagram) {
              instagram = currentUserObject.social_media.instagram;
            }
            if(currentUserObject.social_media.soundcloud) {
              soundcloud = currentUserObject.social_media.soundcloud;
            }
          }
          if(currentUserObject.picture) {
            if(currentUserObject.picture.large) {
              avatar = currentUserObject.picture.large;
            }
          }
          // set profile attributes
          this.setState({
            selectedInstruments: instrumentsObject,
            selectedGenres: genresObject,
            name: name,
            email: email,
            avatar: avatar,
            description: description,
            loading: false,
            twitter: twitter,
            soundcloud: soundcloud,
            instagram: instagram,
            youtube: youtube,
          })
      });
    }

  onSelectedInstrumentsChange = selectedInstruments => {
    this.setState({ selectedInstruments });
    // when selected items change, write over DB instruments values
    // first find the current user's uid
    const userId = firebase.auth().currentUser.uid
    // console.log('this is the current user');
    // console.log(user)
    // console.log(`this is the current user's uid`);
    // console.log(user.uid)
    // const userId = user.uid;

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
  soundcloudPressed(text) {
    AlertIOS.prompt(
      'Enter Soundcloud Profile Name', null,
      text => {
        console.log("You entered "+ text)
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId + '/social_media/soundcloud').set(
          text
        )
        this.setState({
          soundcloud: text,
        })
      },
      'plain-text',
      this.state.soundcloud,
    );

  }
  twitterPressed(text) {
    AlertIOS.prompt(
      'Enter Twitter Handle', null,
      text => {
        console.log("You entered "+ text)
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId + '/social_media/twitter').set(
          text
        )
        this.setState({
          twitter: text,
        })
      },
      'plain-text',
      this.state.twitter,
    );
  }
  instagramPressed(text) {
    AlertIOS.prompt(
      'Enter Instagram Username', null,
      text => {
        console.log("You entered "+ text)
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId + '/social_media/instagram').set(
          text
        )
        this.setState({
          instagram: text,
        })
      },
      'plain-text',
      this.state.instagram,
    );
  }
  youtubePressed() {
    AlertIOS.prompt(
      'Enter Youtube Username', null,
      text => {
        console.log("You entered "+ text)
        const userId = firebase.auth().currentUser.uid;
        firebase.database().ref('users/' + userId + '/social_media/youtube').set(
          text
        )
        this.setState({
          youtube: text,
        })
      },
      'plain-text',
      this.state.youtube,
    );
  }

  uploadImage (uri, mime = 'image/jpg') {
  return new Promise((resolve, reject) => {
    const userId = firebase.auth().currentUser.uid;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebase.storage().ref(`images/${userId}`).child('profile')
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
   showImagePicker() {
     const userId = firebase.auth().currentUser.uid;
     ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else {
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      console.log('this is the response uri')
      console.log(response.uri)
      this.uploadImage(response.uri)
        // after the image is added to firebase storage, add it to appropriate location in FB RTDB under users/uid/picture/
        .then(url => {
          firebase.database().ref('users/' + userId + '/picture/large').set(url)
          firebase.database().ref('users/' + userId + '/picture/thumbnail').set(url)
          this.setState({avatar: url})
        })
        .catch(error => console.log(error))
    }
  });
}

  render() {
    console.log(`######### IN MY PROFILE CONTAINER'S RENDER ##############`)
    console.log('this is the soundcloud profile name')
    console.log(this.state.soundcloud);
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
      <View style={styles.header}>
      <View style={styles.avatarContainer}>
      <Avatar
        xlarge
        rounded
        source={{uri: this.state.avatar}}
        activeOpacity={0.7}
        containerStyle={{marginTop: 30, justifyContent: 'center'}}
      />
      </View>
      <View style={styles.button}>
      <TouchableOpacity
      style={{ borderRadius: 15, backgroundColor: '#4A6D7C', paddingVertical: 6, paddingHorizontal: 11}}
      onPress={this.showImagePicker}
      >
        <Text style={styles.buttonText}>Edit Photo</Text>
      </TouchableOpacity>


      </View>
      <View style={styles.socialContainer}>
        <SocialIcon
          raised={false}
          type='soundcloud'
          onPress={this.soundcloudPressed}
          onLongPress={this.soundcloudPressed}
        />
        <SocialIcon
        type='twitter'
        onPress={this.twitterPressed}
        onLongPress={this.twitterPressed}
        />
        <SocialIcon
          light
          type='youtube'
          onPress={this.youtubePressed}
          onLongPress={this.youtubePressed}
        />
        <SocialIcon
          light
          type='instagram'
          onPress={this.instagramPressed}
          onLongPress={this.instagramPressed}
        />
      </View>
      </View>
      <View style={styles.form}>
      <FormLabel labelStyle={{fontSize: 14, color:'#525966', fontWeight: 'normal'}}>Name</FormLabel>
      <FormInput
      placeholder= 'Please enter your name...'
      onChangeText={(text) => this.nameChange(text)}
      defaultValue={this.state.name}
      />
      <FormLabel labelStyle={{fontSize: 14, color:'#525966', fontWeight: 'normal'}}>Email</FormLabel>
      <FormInput
      placeholder= 'Please enter your email...'
      onChangeText={(text) => this.emailChange(text)}
      defaultValue={this.state.email}
      />
      <FormLabel labelStyle={{fontSize: 14, color:'#525966', fontWeight: 'normal'}}>Description</FormLabel>
      <FormInput
      placeholder= 'Please enter a description...'
      containerStyle={styles.input}
      multiline={true}
      onChangeText={(text) => this.descriptionChange(text)}
      defaultValue={this.state.description}
      />
      </View>
      <View style={styles.form}>
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
          tagRemoveIconColor="red"
          tagBorderColor="#62929E"
          tagTextColor="#4A6D7C"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC', minHeight: 50 }}
          submitButtonColor="#CCC"
          submitButtonText="Submit Genres"
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
            tagRemoveIconColor="red"
            tagBorderColor="#62929E"
            tagTextColor="#4A6D7C"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC', minHeight: 50  }}
            submitButtonColor="#CCC"
            submitButtonText="Submit Instruments"
            hideTags={false}
            fixedHeight={false}
          />
          </ScrollView>
          </View>
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
  borderBottomWidth: 0,
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
},
form: {
  backgroundColor: '#fff',

},
socialContainer: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
header: {
  // backgroundColor: '#62929E'
  backgroundColor: '#fff'
},
button: {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingBottom: 20,
  // padding: 20,
},
buttonText: {
  textAlign: 'center',
  color: '#FFFFFF'
},
});
// TODO: add selected items to DB and remove items from DB
// <View>
//   {this.multiSelect.getSelectedItemsExt(selectedItems)}
// </View>
//
// <Button
//   raised
//   icon={{name: 'photo'}}
//   title='Edit'
//   backgroundColor='#4A6D7C'
//   borderRadius={15}
//   containerViewStyle={{borderRadius: 15, height: 20 }}
//   onPress={this.showImagePicker}
//    />
