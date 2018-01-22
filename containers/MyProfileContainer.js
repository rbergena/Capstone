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
  },
  maxWidth: 500,
  maxHeight: 500,
  quality: 0.2,
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

    const userId = firebase.auth().currentUser.uid;
    // get users information from user/uid node
      firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
        let instrumentsObject = [];
        let genresObject = [];
        let avatar = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
          let currentUserObject = snapshot.val();
          // if the instruments or genre nodes exists, set the state of selected instruments or genres to those currently in the DB
          if(currentUserObject.instruments) {
            instrumentsObject =  Object.keys(currentUserObject.instruments)
          }
          if(currentUserObject.genres) {
            genresObject = Object.keys(currentUserObject.genres)
          }
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

      let results = {};
      selectedInstruments.forEach((instrument) => {
        results[instrument] = true
      });
      firebase.database().ref('users/' + userId + '/instruments').set(
        results
      )
  };

  onSelectedGenresChange = selectedGenres => {
    this.setState({ selectedGenres });
    // when selected items change, write over DB Genres values
    // first find the current user's uid
    const user = firebase.auth().currentUser
    const userId = user.uid;

      let results = {};
      selectedGenres.forEach((genre) => {
        results[genre] = true
      });
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
        // console.log("You entered "+ text)
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
        // console.log("You entered "+ text)
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
        // console.log("You entered "+ text)
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
        // console.log("You entered "+ text)
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

   showImagePicker() {
     const userId = firebase.auth().currentUser.uid;
     ImagePicker.showImagePicker(options, (response) => {

    if (response.didCancel) {
      // console.log('User cancelled image picker');
    }
    else if (response.error) {
      // console.log('ImagePicker Error: ', response.error);
    }
    else {
      let source = { uri: response.uri };

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
    const { selectedInstruments } = this.state;
    const { selectedGenres } = this.state;

    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
        </View>
      )
    } else {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <ScrollView >
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

              <Button
                icon={{name: 'photo'}}
                title='Edit'
                rounded={true}
                buttonStyle={{padding: 5, backgroundColor: '#4A6D7C' }}
                onPress={this.showImagePicker}
                />
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
            <FormLabel labelStyle={{fontSize: 15, color:'#4c69a5', fontWeight: 'bold'}}>Name</FormLabel>
            <FormInput
            inputStyle={{ color: '#525966' }}
            placeholder= 'Please enter your name...'
            onChangeText={(text) => this.nameChange(text)}
            defaultValue={this.state.name}
            />
            <FormLabel labelStyle={{fontSize: 15, color:'#4c69a5', fontWeight: 'bold'}}>Email</FormLabel>
            <FormInput
            inputStyle={{ color: '#525966' }}
            placeholder= 'Please enter your email...'
            onChangeText={(text) => this.emailChange(text)}
            defaultValue={this.state.email}
            />
            <FormLabel labelStyle={{fontSize: 15, color:'#4c69a5', fontWeight: 'bold'}}>Description</FormLabel>
            <FormInput
            inputStyle={{  paddingRight: 40, color: '#525966' }}
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
                searchInputStyle={{fontSize: 16, color: '#CCC', fontWeight: 'bold', minHeight: 50}}
                searchInputPlaceholderText="Search Genres..."
                tagRemoveIconColor="red"
                tagBorderColor="#62929E"
                tagTextColor="#4A6D7C"
                selectedItemTextColor='#4c69a5'
                selectedItemIconColor='#4c69a5'
                itemTextColor="#000"
                displayKey="name"
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
                tagRemoveIconColor="red"
                tagBorderColor="#62929E"
                tagTextColor="#4A6D7C"
                selectedItemTextColor='#4c69a5'
                selectedItemIconColor='#4c69a5'
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{fontSize: 16, color: '#CCC', fontWeight: 'bold', minHeight: 50}}
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
    backgroundColor: '#fff',
  },
  input: {
  minHeight: 100,
  borderBottomWidth: 0,
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

// <Button
//   raised
//   icon={{name: 'photo'}}
//   title='Edit'
//   backgroundColor='#4A6D7C'
//   borderRadius={15}
//   containerViewStyle={{borderRadius: 15, height: 20 }}
//   onPress={this.showImagePicker}
//    />

// <TouchableOpacity
// style={{ borderRadius: 15, backgroundColor: '#4A6D7C', paddingVertical: 6, paddingHorizontal: 11}}
// onPress={this.showImagePicker}
// >
//   <Text style={styles.buttonText}>Edit Photo</Text>
// </TouchableOpacity>
