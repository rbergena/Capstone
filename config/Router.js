// App Routing
import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
// import screens
import LoginScreen from '../screens/LoginScreen.js';
import CreateAccountForm from '../components/CreateAccount/CreateAccountForm.js';
import MyProfileScreen from '../screens/MyProfileScreen.js';
import UserDetailsScreen from '../screens/UserDetailsScreen.js';
import UsersFeedScreen from '../screens/UsersFeedScreen.js';
import Map from '../screens/Map.js';
import WebViewScreen from '../screens/WebViewScreen.js';

export const SignInStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    // navigationOptions: ({ navigation }) => ({
    navigationOptions: {
      title: 'Login',
      headerLeft: null
    }
    // }),
  },
  CreateAccount: {
    screen: CreateAccountForm,
    // navigationOptions: ({ navigation }) => ({
    navigationOptions: {
      title: 'Create Account',
      headerLeft: null
    }
    // }),
  },
});

export const UsersFeedNavigator = StackNavigator({
  UsersFeed: {
    screen: UsersFeedScreen,
    navigationOptions: {
      title: 'Users List',
    },
  },
  UserDetails: {
    screen: UserDetailsScreen,
    navigationOptions: {
      title: 'User Details',
    },
  },
  SocialMediaWebView: {
    screen: WebViewScreen,
    navigationOptions: {
      title: 'Social Media Web View',
    },
  },
});

export const MapNavigator = StackNavigator({
  UsersFeed: {
    screen: Map,
    navigationOptions: {
      title: 'Map',
    },
  },
  UsersDetails: {
    screen: UserDetailsScreen,
    navigationOptions: {
      title: 'User Details',
    },
  },
  SocialMediaWebView: {
    screen: WebViewScreen,
    navigationOptions: {
      title: 'Social Media Web View',
    },
  },
});

export const TabsNavigator = TabNavigator({
  MyProfile: {
    screen: MyProfileScreen,
    navigationOptions: {
      title: 'My Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    }
  },
  Users: {
    screen: UsersFeedNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
    }
  },
  Map: {
    screen: MapNavigator,
    navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon name="map" size={35} color={tintColor} />
    }
  },
},
// make headers consistent
{
  headerMode: 'none'
});

// TODO
export const RootNavigator = StackNavigator({
  SignIn: {
    screen: SignInStack,
  },
  Tabs: {
    screen: TabsNavigator,
  },
},
// make headers consistent
{
  headerMode: 'none'
})
