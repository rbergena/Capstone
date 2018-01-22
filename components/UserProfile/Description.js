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
export const Description = (props) => {

    return (
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
                subtitleNumberOfLines={0}
                subtitleStyle={{ fontSize: 15 }}
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
                subtitleStyle={{ fontSize: 15 }}
                hideChevron
              />
              <View style={styles.icons}>
                { props.instruments ? (
                  <Icons instruments={Object.keys(props.instruments)} />)
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
                subtitleStyle={{ fontSize: 15 }}
                hideChevron
              />
            </List>
          ) : null}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
  },
  icons: {
    flexDirection: 'row',
    marginRight: 10,
    marginTop: 5,
    marginBottom: 10,
    paddingLeft: 20,
  },
});
