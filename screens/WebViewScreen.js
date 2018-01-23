import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  StyleSheet,
} from 'react-native';

export default class WebViewScreen extends React.Component {
  render() {
    return (
      <WebView
        source={{uri: this.props.navigation.state.params.finalURI}}
        style={styles.container}
      />
    );
   }
}


const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
  },
});
