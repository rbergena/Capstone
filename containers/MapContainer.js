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
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    // this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);

  }

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
  }
  // //navigate to user details page and pass selected user object
  goToUserDetails(user){
    console.log('callout was pressed: Now in userdetails event handler')
    this.props.navigate('UsersDetailsFromMap', {...user})
  }


  // could use onRegionChange to fetch every time we move map, but start off with just always rendering all markers
  onRegionChange(region) {
    console.log('this is the region')
    console.log(region)
    // this.setState({initialPosition: region});
  }
  // onRegionChangeComplete(region) {
  //   // console.log('this is the region')
  //   // console.log(region)
  //   // this.setState({initialPosition: region});
  // }


  render() {
    console.log('########## MAP CONTAINER ###########')
    console.log(this.props.users)
    console.log('in render');
    // make 1px or
    console.log('this is this.props.users in the map container')
    console.log(this.props.users)
    console.log('this is the props filterText')
    console.log(this.props.searchText)
    console.log('this is the props filterIndex')
    console.log(this.props.searchIndex)
    let filteredUsers = [];
    // exclude users with no name, instruments, or genres
    // this.props.users.forEach((user) => {
    //   if(user.name && user.instruments && user.genres) {
    //
    //   }
    // })
    // if filtertext is not an empty string, filter users by instrument and genre
    if(this.props.searchText !== '') {
      // filter by instrument (at index 0)
      if(this.props.searchIndex === 0) {
        this.props.users.forEach((user) => {
          console.log('this is a user in the user lists container')
          console.log(user)
          let userInstruments = Object.keys(user.instruments)
          console.log('users instruments')
          console.log(userInstruments)
          userInstruments.forEach((instrument) => {
            // if instrument matches filter text, push user into filteredUsers array
            console.log('this is the instrument')
            console.log(instrument)
            console.log('this is the search text')
            console.log(this.props.searchText)
            if(instrument.match(this.props.searchText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })


        })
        console.log('this is the filtered users array')
        console.log(filteredUsers)
      }
    // search by genre (at index 1)
    else if(this.props.searchIndex === 1) {
        this.props.users.forEach((user) => {
          console.log('this is a user in the user lists container')
          console.log(user)
          let userGenres = Object.keys(user.genres)
          console.log('users genres')
          console.log(userGenres)
          userGenres.forEach((genre) => {
            // if instrument matches filter text, push user into filteredUsers array
            console.log('this is the instrument')
            console.log(genre)
            console.log('this is the filter text')
            console.log(this.props.searchText)
            if(genre.match(this.props.searchText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })

      })
      console.log('this is the filtered users array')
      console.log(filteredUsers)
      // else if()
      // filter by instrument

    }
  }
  // no text inputed so show all users
  else {
    Array.prototype.push.apply(filteredUsers,this.props.users)
    // filteredUsers.concat(this.props.users)
    console.log('these are the filtered users with no search text')
    console.log(filteredUsers)
  }
    return (
      <View style={styles.container}>
        <MapView.Animated
        style={styles.map}
        region={this.state.initialPosition}
        showsUserLocation={true}
        userLocationAnnotationTitle={''}
        onRegionChange={this.onRegionChange}
        >

        {filteredUsers.map((marker, index) => (
          marker.coordinates ? (
            <MapView.Marker coordinate={marker.coordinates} key={index}>
          <MapView.Callout
            tooltip={false}
            style={styles.callout}
            onPress={() => {this.goToUserDetails({...marker})}}
            >
            <View>
              <Text style={styles.name}>{marker.name}</Text>
              <Text style={styles.genres}>{Object.keys(marker.genres).join(', ')}</Text>
              <Text style={styles.instruments}>{Object.keys(marker.instruments).join(', ')}</Text>


            </View>
           </MapView.Callout>
          </MapView.Marker>
        ) : null
        ))}

          </MapView.Animated>
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
    flex: 9,
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
  instruments: {
    // color: '#9C7178',
    // color: '#548089'
    color: '#00171F',
    fontWeight: 'bold',
  },
  genres: {
    // color: '#829356',
    // color: '#9C7178'
    color: '#003459',
    fontWeight: 'bold',
  },
  name: {
    color: '#86939e',
    textAlign: 'center',
    fontWeight: '800',

  },
  callout: {
  width: 140,
  },
  icons: {
    flexDirection: 'row',
  }
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


            // <View style={styles.icons}>
            // <Image source={require('../assets/Djembe.png')}
            // style={{width: 25, height: 25, marginRight: 5}}
            // />
            // <Image source={require('../assets/Djembe.png')}
            // style={{width: 25, height: 25, marginRight: 5}}
            // />
            // </View>
            // <MapView.Marker
            //   coordinate={this.state.markerPosition}
            //   key={'me'+ Date.now}>
            //   <View style={styles.radius}>
            //     <View style={styles.marker} />
            //   </View>
            //   <MapView.Callout tooltip={true}>
            //
            //   </MapView.Callout>
            //
            //   </MapView.Marker>

        // <Text style={{ fontFamily: 'Al Nile' }}>Custom Font</Text>
