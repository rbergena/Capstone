// Login Form Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import Login from './Login';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
const window = Dimensions.get('window');

const IMAGE_HEIGHT = window.width / 2;

export default class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      email: '',
      password: ''
    }
    this.login = this.login.bind(this);
  }
  login(){
    // TODO: will use for loading visual later
    this.setState({
      loaded: false
    })
    // console.log(this.state.email);
    // console.log(this.state.password);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((user) => {
      // console.log('current loggged in user')
      // console.log(firebase.auth().currentUser);
      this.props.navigate('Tabs');
    })
    .catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // console.log(error);
    });
    // console.log('current loggged in user')
    // console.log(firebase.auth().currentUser);
    // this.setState({
    //   email: '',
    //   password: '',
    //   loaded: true
    // });
    // var user = firebase.auth().currentUser;
    // if (user) {
    //   // If user is signed in. Then navigate to Tabs screen.
    //   this.props.navigate('Tabs');
    // }
  }
  logout(){
    firebase.auth().signOut().then(function() {
      // console.log('Signed Out');
      // console.log('is user logged in?')
      // console.log(firebase.auth().currentUser);
    }, function(error) {
      console.error('Sign Out Error', error);
    });

  }
  render() {
    // console.log('navigation props')
    // console.log(this.props.navigate)

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
        source={require('../images/JamOutLogo.png')}
        style={styles.logo}
        />
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
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
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            ref={(input) => this.passwordInput = input}
            />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={this.login}> Login </Text>
          </TouchableOpacity>
          <Text style={styles.textLink} onPress={() => this.props.navigate('CreateAccount')}>
            Create an account
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4c69a5'
  },
  // logo: {
  //   width: 100,
  //   height: 100,
  // },
  logo: {
  height: IMAGE_HEIGHT,
  resizeMode: 'contain',
  marginBottom: 20,
  padding:10,
  marginTop:20
},
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  loginContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    backgroundColor: 'rgb(189, 195, 199)',
    paddingVertical: 15,
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
// add later
// source={require('./images/JamOutLogo.png')}
// <Text style={styles.textLink} onPress={this.logout}>
//   Logout
// </Text>
