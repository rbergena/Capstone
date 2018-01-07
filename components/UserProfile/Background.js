import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Tile } from 'react-native-elements'

// functional component to display user background (photo and information (city, state etc.))
// export function Background(props) {
export const Background = (props) => {
  let profilePicture = props.picture;
  return (
    <Tile
      imageSrc={{uri: profilePicture}}
      title="Lorem ipsum dolor sit amet, consectetur"
      contentContainerStyle={{height: 70}}
    >
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>Caption</Text>
        <Text>Caption</Text>
      </View>
    </Tile>
  );

}


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
