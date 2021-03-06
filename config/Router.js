// App Routing
import React from 'react';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
import {
  Alert,
} from 'react-native';
// import screens
import LoginScreen from '../screens/LoginScreen.js';
import CreateAccountForm from '../components/CreateAccount/CreateAccountForm.js';
import MyProfileScreen from '../screens/MyProfileScreen.js';
import UserDetailsScreen from '../screens/UserDetailsScreen.js';
import UsersFeedScreen from '../screens/UsersFeedScreen.js';
import MapScreen from '../screens/MapScreen.js';

import WebViewScreen from '../screens/WebViewScreen.js';
import LogoutScreen from '../screens/LogoutScreen.js';
import ChatScreen from '../screens/ChatScreen.js';
import MyMessagesScreen from '../screens/MyMessagesScreen.js';


import * as firebase from 'firebase';


export const SignInStack = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      title: 'Login',
      headerLeft: null
    }
  },
  CreateAccount: {
    screen: CreateAccountForm,
    navigationOptions: {
      title: 'Create Account',
      headerLeft: null
    }
  },
});

export const UsersFeedNavigator = StackNavigator({
  UsersFeed: {
    screen: UsersFeedScreen,
    navigationOptions: {
      title: 'Musicians',
    },
  },
  UserDetailsFromFeed: {
    screen: UserDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile`,
      tabBarLabel: 'Profile',
    }),
  },
  SocialMediaWebView: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.user}'s ${navigation.state.params.socialName}`,
      tabBarLabel: 'Social',
    }),
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      title: 'Chat',
    }
  },
});

export const MapNavigator = StackNavigator({
  MapView: {
    screen: MapScreen,
    navigationOptions: {
      title: 'Map',
    },
  },
  UsersDetailsFromMap: {
    screen: UserDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile`,
      tabBarLabel: 'Profile',
    }),
  },
  SocialMediaWebView: {
    screen: WebViewScreen,
    navigationOptions: {
      // title: 'Social',
      tabBarLabel: 'Social',
    },
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      title: 'Chat',
    }
  },
});

export const MyProfileNavigator = StackNavigator({
  MyProfile: {
    screen: MyProfileScreen,
    navigationOptions: {
      title: 'My Profile',
    }
  },
})

// messages navigator
export const MessagesNavigator =
StackNavigator({
  Messages: {
    screen: MyMessagesScreen,
    navigationOptions: {
      title: 'Messages',
    }
  },
  Chat: {
    screen: ChatScreen,
    navigationOptions: {
      title: 'Chat',
    }
  },
})

export const TabsNavigator = TabNavigator({
  MyProfile: {
    screen: MyProfileNavigator,
    navigationOptions: {
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
  Messages: {
    screen: MessagesNavigator,
    navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon name="email" size={35} color={tintColor} />
    }
  },
  Logout: {
     screen: LogoutScreen,     // Empty screen, useless in this specific case
      navigationOptions: ({navigation}) => ({
           tabBarOnPress: (scene, jumpToIndex) => {
               return Alert.alert(   // Shows the alert without redirecting anywhere
                   'Confirmation required'
                   ,'Do you really want to logout?'
                   ,[
                     {text: 'Accept', onPress: () => {
                       // sign out user, then redirect to login route
                       firebase.auth().signOut().then(function() {}, function(error) {
                        console.error('Sign Out Error', error);
                      });
                       // navigate to login route
                        navigation.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
                   }},
                     {text: 'Cancel'}
                    ]
               );
           },
           tabBarIcon: ({ tintColor }) => <Icon name="exit-to-app" size={35} color={tintColor} />
       })

    },

},
// make headers consistent
// {
//   headerMode: 'none'
// }
);

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
