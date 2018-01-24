import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements'

export const Background = (props) => {
  let profilePicture = props.picture;
  let city = props.city;
  let email = props.email;

  return (
      <View style={styles.container}>
        <Avatar
          xlarge
          rounded
          source={{uri: profilePicture}}
          activeOpacity={0.7}
          containerStyle={{marginTop: 30}}
        />
        <Button
          icon={{name: 'email'}}
          title='Chat'
          rounded={true}
          buttonStyle={{padding: 5, marginTop: 10}}
          onPress={() => props.navigate('Chat', {user: props.user})}
          />
        <Text style={styles.text}>
          {email}
        </Text>
        { props.city ? (
          <Text style={styles.font}>
            {city}
          </Text>) : null
        }
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#43484d',
    backgroundColor: 'transparent'
  },
  font: {
    fontSize: 12,
    color: '#43484d',
    backgroundColor: 'transparent',
  }
});
