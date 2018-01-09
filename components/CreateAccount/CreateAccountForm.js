// Login Form Component
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Login from '../Login/Login';
import * as firebase from 'firebase';
import firebaseApp from '../../services/firebase';


export default class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: true,
      email: '',
      password: ''
    }
  }
  createaccount(){
    // TODO: will use for loading visual later
    this.setState({
      loaded: false
    })
    console.log(this.state.email);
    console.log(this.state.password);
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users/' + user.uid).set({
            email: user.email,
            uid : user.uid,
        });
        console.log("User added to DB.");
      } else {
         console.log("No user added to DB.");
      }
    });

    this.setState({
      email: '',
      password: '',
      loaded: true
    });
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
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
            <Text style={styles.buttonText} onPress={this.createaccount.bind(this)}> Create Account </Text>
          </TouchableOpacity>
          <Text style={styles.textLink} onPress={() => navigate('Login')}>
            Already have an account? Login
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink'
  },
  logo: {
    width: 100,
    height: 100,
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
