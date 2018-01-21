// List view of nearby users
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



export default class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      markers: []
    }
  }

  // add watch id if tracking changes in geolocation
  componentDidMount() {
    // get current position through geolocation and store lat and lng
    // get current position accepts three parameters: success callback, an error callback, and a configuration object (in that order)
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      // store the initial region returned in position
      const initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      // set intial position and initial region
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
      // parse any error messages
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})
    // fetch firebase user data and set state of markers
    this.getUserData();
    // could add event watcher for changes in the geolocation, but save for later if necessary
  }
  // parse firebase user data
  getUserData() {
    // fetch markers data from firebase
    const usersRef = firebase.database().ref("users/");

    firebase.database().ref('/users/').once('value').then((snapshot) => {
      // console.log('*******IN THE FIREBASE CALL  IN MAP PAGE ********')

      let results = [];
      let users = snapshot.val()
      // console.log('snapshot');
      // console.log(users);
      // get user data objects without having to know uid

      for(var propName in users) {
        if(users.hasOwnProperty(propName)) {
          var propValue = users[propName];
          // user data objects in array
          // console.log('propValue')
          // console.log(propValue)
          propValue.uid = propName
          // console.log('prop value object after adding uid key and value')
          // console.log(propValue)
          results.push(propValue)


          // console.log('results after prop pushed in')
          // console.log(results)
        }
      }
      // // push off last result
      // console.log('results pop')
      // console.log(results.pop());
      // results.push(snapshot.val());
      // results returns three items last one is whole
//       console.log('results');
//       console.log(results);
//       // get coordinates for each marker
//       results.forEach((userData) => {
//         console.log('user data coordinates');
//         // only show if coordinates are defined
//         if(userData.coordinates) {
//           results.push(userData);
//           console.log(userData.coordinates);
//           console.log(userData.name);
//         }
//     //
//     // console.log(userData.coordinates);
//     // console.log(userData.name);
// });
      // change state of markers
      // only using one works!
      // markers: results.slice(0,1)

      this.setState({
        markers: results
      })
    });
  }

  // //navigate to user details page and pass selected user object
  goToUserDetails(user){
    // console.log('callout was pressed: Now in userdetails event handler')
    // this.props.navigate('UserDetails', {...user})
    this.props.navigation.navigate('UsersDetailsFromMap', {...user})
  }


  // could use onRegionChange to fetch every time we move map, but start off with just always rendering all markers

  render() {
    // console.log('########## MAP CONTAINER ###########')
    // console.log(this.state.markers)
    // console.log('in render');
    // make 1px or
    return (
      <View style={styles.container}>
        <MapView
        style={styles.map}
        region={this.state.initialPosition}
        >
        <MapView.Marker
          coordinate={this.state.markerPosition}
          key={'me'+ Date.now}>
          <View style={styles.radius}>
            <View style={styles.marker} />
          </View>
          <MapView.Callout tooltip={true}>

          </MapView.Callout>

          </MapView.Marker>
        {this.state.markers.map((marker, index) => (
          marker.coordinates ? (
            <MapView.Marker coordinate={marker.coordinates} key={index}>
          <MapView.Callout
            tooltip={false}
            onPress={() => {this.goToUserDetails({...marker})}}
            >
            <View>
              <Text>{marker.name}</Text>
              <Text>Genres: {Object.keys(marker.genres).join(', ')}</Text>
              <Text>Instruments: {Object.keys(marker.instruments).join(', ')}</Text>
            </View>
           </MapView.Callout>
          </MapView.Marker>
        ) : null
        ))}

          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radius: {
    height: 30,
    width: 30,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  mapContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
    // height: 400,
    // width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
  },
});

// {this.state.markers.map((marker, index) => (
// <MapView.Marker
//   key={index}
//   coordinate={marker.coordinates}
// >
//   <MapView.Callout>
//       <View style={styles.callout}>
//         <Text>{marker.name}</Text>
//       </View>
//   </MapView.Callout>
// </MapView.Marker>
// ))}

// WORKING
// {this.state.markers.map((marker, index) => (
//   <MapView.Marker coordinate={marker.coordinate} key={index}>
//   <MapView.Callout >
//
//    <View style={styles.callout}>
//        <Text>This is a plain view</Text>
//     </View>
//    </MapView.Callout>
//   </MapView.Marker>
// ))}

// {this.state.markers.map((marker, index) => (
//   <MapView.Marker coordinate={marker.coordinates} key={index}>
//   <MapView.Callout tooltip={false}>
//     <View>
//        <Text>test</Text>
//     </View>
//    </MapView.Callout>
//   </MapView.Marker>
// ))}
// <MapView.Marker
//   coordinate={this.state.markerPosition}
//   key={0}>
//   <View style={styles.radius}>
//     <View style={styles.marker} />
//   </View>
//   </MapView.Marker>

            // <MapView.Marker key={1} coordinate={{
            //   latitude:47.606701,
            //   longitude:-122.332501}
            // }>
            // <MapView.Callout tooltip={false}>
            //   <View>
            //      <Text>test2</Text>
            //   </View>
            //  </MapView.Callout>
            // </MapView.Marker>
            // <MapView.Marker key={2} coordinate={{
            //   latitude: 47.60694,
            //   longitude: -122.324065}
            // }>
            // <MapView.Callout tooltip={false}>
            //   <View>
            //      <Text>test2</Text>
            //   </View>
            //  </MapView.Callout>
            // </MapView.Marker>
