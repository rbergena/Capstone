// App Routing
import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
// TODO import { Icon } from 'react-native-elements';

import LoginForm from '../components/Login/LoginForm.js';
import CreateAccountForm from '../components/CreateAccount/CreateAccountForm.js';

export const SignInStack = StackNavigator({
  Login: {
    screen: LoginForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
      headerLeft: null
    }),
  },
  CreateAccount: {
    screen: CreateAccountForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Account',
      headerLeft: null
    }),
  },
});
