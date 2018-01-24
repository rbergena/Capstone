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
import LinearGradient from 'react-native-linear-gradient';

export default class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient colors={['#fdfcfb', '#e2d1c3']} style={styles.linearGradient}>

      <View >
        <ScrollView>
          <Background picture={ this.props.userInfo.picture ? (this.props.userInfo.picture.large) : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
          }
          city={this.props.userInfo.city_state}
          email={this.props.userInfo.email}
          navigate={this.props.navigate}
          user={this.props.userInfo}
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // backgroundColor: 'rgba(241,222,218,0.8)',
    // backgroundColor: 'hsla(0, 100%, 90%, 0.2)'
    // backgroundColor: '#4c69a5',
    // backgroundColor: '#565E69',
    backgroundColor: 'rgba(76,105,165, 0.6)'

    // backgroundColor: 'rgba(255,255,255, 0.2)'
    // backgroundColor: 'white',
    // opacity: 0.5,
    // paddingTop: 20,
  },
  linearGradient: {
    flex: 1,
  },
});

// color gradients
// colors={['#ff9a9e', '#fad0c4']
// ['#ee9ca7', '#ffdde1']
// ['#29323c', '#485563']
// ['#09203f', '#537895']

// OR THIS ONE
// ['#434343', '#000000']
// this ONE
// ['#fdfcfb', '#e2d1c3']
// OR
// ['#f5f7fa', '#c3cfe2']
// ['#a3bded', '#6991c7']
//['#feada6', '#f5efef']
// ['#fdfbfb', '#ebedee']
// ['#29323c', '#485563']
