// User Description: includes description, instruments, and genres
// Description Component
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import {Icons} from '../../config/InstrumentsGenres';


// description component receives user description as props from user profile container
// export default class Description extends Component {
//   constructor(props) {
//     super(props);
//   }
export const Description = (props) => {

  // render() {
    return (
        // <View style={styles}>
        <View style={styles.container}>
              { props.description ? (
                <List>
                <ListItem
                  title="Description"
                  titleStyle={styles.title}
                  hideChevron
                />
                <ListItem
                  subtitle={props.description}
                  hideChevron
                />
                </List>
              ) : null}
              { props.instruments ? (
                <List containerStyle={{borderBottomColor: '#bbb', borderBottomWidth: 1}}>
                <ListItem
                  title="Instruments"
                  titleStyle={styles.title}
                  hideChevron
                />
                <ListItem
                  containerStyle={{borderBottomWidth: 0}}
                  subtitle={Object.keys(props.instruments).join(', ')}
                  hideChevron
                />
                <View style={styles.icons}>
                { props.instruments ? (<Icons instruments={Object.keys(props.instruments)} />)
                : null
                }
                </View>
                </List>
              ) : null}
              { props.genres ? (
                <List>
                <ListItem
                  title="Genres"
                  titleStyle={styles.title}
                  hideChevron
                />
                <ListItem
                  titleStyle={styles.title}
                  subtitle={Object.keys(props.genres).join(', ')}
                  hideChevron
                />
                </List>
              ) : null}
      </View>
    );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
  },
  // titleContainer: {
  //   borderBottomWidth: 3,
  // }
  icons: {
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 20,
  },

});

// {isLoggedIn ? (
//    <LogoutButton onClick={this.handleLogoutClick} />
//  ) : (
//    <LoginButton onClick={this.handleLoginClick} />
//  )}
//
// {this.props.links.twitter ? (
//
// ) : null}
// {this.props.links.youtube ? (
//
// ): null}
//
// { props.instruments ? (
//   <ListItem
//     title="Instruments"
//     titleStyle={styles.title}
//     subtitle={Object.keys(props.instruments).join(', ')}
//     hideChevron
//   />
// ) : null}
// { props.genres ? (
//   <ListItem
//     title="Genres"
//     titleStyle={styles.title}
//     subtitle={Object.keys(props.genres).join(', ')}
//     hideChevron
//   />
// ) : null}
