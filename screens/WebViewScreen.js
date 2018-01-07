import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  StyleSheet,
} from 'react-native';

export default class WebViewScreen extends React.Component {
  render() {
    console.log('these are the passed down params from navigation')
    console.log(this.props.navigation.state.params)
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

// <View>
//   <Text>
//     This is the webview screen
//   </Text>
// </View>
