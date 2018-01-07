import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Tile, Avatar } from 'react-native-elements'

// functional component to display user background (photo and information (city, state etc.))
// NOTE: react-native-elements Tile component style raises a warning
// export function Background(props) {
export const Background = (props) => {
  console.log('these are the props passed down to background')
  console.log(props);
  let profilePicture = props.picture;
  let city = props.city;
  let email = props.email;
  console.log('this is the profile picture uri')
  console.log(profilePicture)
  return (
      <View style={styles.container}>
        <Avatar
          xlarge
          rounded
          source={{uri: profilePicture}}
          activeOpacity={0.7}
        />
        <Text style={styles.text}>
          email: {email}
        </Text>
        <Text>
          city: {city}
        </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: 300,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // item: {
  // padding: 10,
  // fontSize: 18,
  // height: 70,
  // },
});


// Stateless functional component way to display a prop using a variable:
// export const MyComponentClass = (props) => {
// 	let title = props.title;
//   return <h1>{title}</h1>;
// }




// <Tile
//   imageSrc={{require: ('./img/path')}}
//   title="Lorem ipsum dolor sit amet, consectetur"
//   icon={{name: 'play-circle', type: 'font-awesome'}}  // optional
//   contentContainerStyle={{height: 70}}
// >
//   <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
//     <Text>Caption</Text>
//     <Text>Caption</Text>
//   </View>
// </Tile>

// <Tile
//   imageSrc={{uri: profilePicture}}
//   title="Lorem ipsum dolor sit amet, consectetur"
//   contentContainerStyle={{height: 70}}
// >
//   <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
//     <Text>Caption</Text>
//     <Text>Caption</Text>
//   </View>
// </Tile>

// <Tile
// imageSrc={{ uri: profilePicture}}
// imageStyle={{resizeMode: 'cover'}}
// featured
// title= 'full name'
// caption= 'email address'
// />
