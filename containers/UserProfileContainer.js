// User Profile Container Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import SocialMedia from '../components/UserProfile/SocialMedia';
import { Background } from '../components/UserProfile/Background';


export default class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    // don't need state?
    // this.state = {
    //   // users will be populated by the database
    //   users: []
    // }
  }


  // eventually refactor out presentational component
  // need to display instruments from object and genres from object
  // pass social media links as props to the social media component
  // conditionally render social media section if the user has social media links
  render() {
    console.log('user information')
    console.log(this.props.userInfo)
    console.log('social media information')
    console.log(this.props.userInfo.social_media)

    return (
      <View style={styles.container}>
        <Background picture={this.props.userInfo.picture.thubmnail}/>
        {this.props.userInfo.social_media ? (
          <SocialMedia links={this.props.userInfo.social_media}
          navigate={this.props.navigate}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
  padding: 10,
  fontSize: 18,
  height: 70,
},
});
