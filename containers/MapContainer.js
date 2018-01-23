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
import * as firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {Icons} from '../config/InstrumentsGenres';

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
    // this.onRegionChange = this.onRegionChange.bind(this);
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
  // navigate to user details page and pass selected user object
  goToUserDetails(user){
    this.props.navigate('UsersDetailsFromMap', {...user})
  }

  // onRegionChange(region) {
  //   // console.log('this is the region')
  //   // console.log(region)
  //   // this.setState({initialPosition: region});
  // }

  render() {
    let filteredUsers = [];
    // if filtertext is not an empty string, filter users by instrument and genre
    if(this.props.searchText !== '') {
      // filter by instrument (at index 0)
      if(this.props.searchIndex === 0) {
        this.props.users.forEach((user) => {
          let userInstruments = Object.keys(user.instruments)
          userInstruments.forEach((instrument) => {
            // if instrument matches filter text, push user into filteredUsers array
            if(instrument.match(this.props.searchText)) {
              filteredUsers.push(user)
              // move to next user
              return
            }
          })
        })
      }
      // search by genre (at index 1)
      else if(this.props.searchIndex === 1) {
          this.props.users.forEach((user) => {
            let userGenres = Object.keys(user.genres)
            userGenres.forEach((genre) => {
              // if genre matches filter text, push user into filteredUsers array
              if(genre.match(this.props.searchText)) {
                filteredUsers.push(user)
                // move to next user
                return
              }
            })
        })
      }
    }
    // no text inputed so show all users
    else {
      Array.prototype.push.apply(filteredUsers,this.props.users)
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
                  <View style={styles.icons}>
                    { marker.instruments ? (<Icons instruments={Object.keys(marker.instruments)} />)
                    : null
                    }
                  </View>
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
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
  },
  instruments: {
    color: '#00171F',
    fontWeight: 'bold',
  },
  genres: {
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
    marginRight: 10,
    marginTop: 5,
  },
});
