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
// import Map from '../screens/Map.js';
import MapScreen from '../screens/MapScreen.js';

import WebViewScreen from '../screens/WebViewScreen.js';
import LogoutScreen from '../screens/LogoutScreen.js';
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
      title: 'Musicians List',
    },
  },
  UserDetailsFromFeed: {
    screen: UserDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile`,
      tabBarLabel: 'Musician Profile',
    }),
  },
  SocialMediaWebView: {
    screen: WebViewScreen,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.user}'s ${navigation.state.params.socialName}`,
      tabBarLabel: 'Social',
    }),
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
      tabBarLabel: 'Musician Profile',
    }),
  },
  SocialMediaWebView: {
    screen: WebViewScreen,
    navigationOptions: {
      // title: 'Social',
      tabBarLabel: 'Social',
    },
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
                       firebase.auth().signOut().then(function() {
                        console.log('Signed Out');
                        console.log('this is the result for current user')
                        console.log(firebase.auth().currentUser);
                      }, function(error) {
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
