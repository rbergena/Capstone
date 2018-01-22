// Create Account Form Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';

import * as firebase from 'firebase';
const window = Dimensions.get('window');

const IMAGE_HEIGHT_SMALL = window.width /3;
const IMAGE_HEIGHT = window.width / 1.5;

export default class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      email: '',
      password: ''
    }
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  createaccount(){
    // TODO: will use for loading visual later
    this.setState({
      loaded: false
    })
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((user) => {
          firebase.database().ref('users/' + user.uid).set({
              email: user.email,
              uid : user.uid,
          });
          Alert.alert(
            'You successfully created an account!',
            null,
            [
              {text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
            ],
            { cancelable: false }
          )
      this.setState({
        email: '',
        password: '',
        loaded: true
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }
  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Animated.Image source={require('../../images/JamOutLogo.png')} style={[styles.logo, { height: this.imageHeight }]} />
          <TextInput
            style={[styles.input, {marginTop: 40}]}
            placeholder='email'
            onSumbitEditing={() => this.passwordInput.focus()}
            returnKeyType='next'
            keyboardType='email-address'
            autoCapitalize='none'
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            autoCorrect={false}
            />
          <TextInput
            style={styles.input}
            placeholder='password'
            secureTextEntry
            returnKeyType='go'
            onSubmitEditing={this.createaccount.bind(this)}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            ref={(input) => this.passwordInput = input}
            />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={this.createaccount.bind(this)}> Create Account </Text>
          </TouchableOpacity>
          <Text style={styles.textLink} onPress={() => navigate('Login')}>
            Already have an account? Login
          </Text>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c69a5'
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20
  },
  loginContainer: {
    padding: 20,
    flex: 2,
    justifyContent: 'center'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgb(189, 195, 199)',
    paddingVertical: 15,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  textLink: {
    paddingVertical: 20,
    textAlign: 'center',
    color: 'gray'
  }
});
