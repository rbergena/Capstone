// User Profile Container Component
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import SocialMedia from '../components/UserProfile/SocialMedia';
import { Background } from '../components/UserProfile/Background';
import { Description } from '../components/UserProfile/Description';

export default class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    // don't need state
    // user information is passed through navigation props
  }


  // eventually refactor out presentational component
  // need to display instruments from object and genres from object
  // pass social media links as props to the social media component
  // conditionally render social media section if the user has social media links
  render() {
    // const { userInfo } = this.props
    console.log('user information')
    console.log(this.props.userInfo)
    console.log('social media information')
    console.log(this.props.userInfo.social_media)

    return (
      <View style={styles.container}>
        <ScrollView>
        <Background picture={ this.props.userInfo.picture ? (this.props.userInfo.picture.large) : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'   
        }
        city={this.props.userInfo.city_state}
        email={this.props.userInfo.email}
        />
        {this.props.userInfo.social_media ? (
          <SocialMedia links={this.props.userInfo.social_media}
          userName={this.props.userInfo.name}
          navigate={this.props.navigate}
          />
        ) : null}
        <Description
          description={this.props.userInfo.description}
          genres={this.props.userInfo.genres}
          instruments={this.props.userInfo.instruments}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'hsla(0, 100%, 90%, 0.2)'
    // backgroundColor: 'rgba(255,255,255, 0.2)'
    // backgroundColor: 'white',
    // opacity: 0.5,
    // paddingTop: 20,
  },
});
