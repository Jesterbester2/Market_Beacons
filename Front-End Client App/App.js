'use strict';
/**
 * adBeak
 * by: Brian Hoernschemeyer, Stuart Adler, Andrew Maynard, Jacob Green
 * https://github.uc.edu/hoernsbj/Market-Beacons
 * @flow
 */

 import React from 'react';
 import { AppRegistry, StyleSheet, Text, Image, View, Button, ListView, DeviceEventEmitter, TouchableOpacity, Modal, Alert } from 'react-native';
 import { StackNavigator } from 'react-navigation';
 import SettingsList from 'react-native-settings-list';
 import Beacons from 'react-native-beacons-manager';

 // import style sheets
 import styles from './app/styles/styles.js'

 // import screens
 import SettingsScreen from './app/screens/SettingsScreen/SettingsScreen.js'
 import BeaconScreen from './app/screens/BeaconScreen/BeaconScreen.js'
 import UserProfileScreen from './app/screens/UserProfileScreen/UserProfileScreen.js'

// remove warning only temporarily
// need to figure out why and when setState is being called on unmounted component
console.disableYellowBox = true;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'adBeak',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {{paddingTop: 10}}>
        <Text style = {{paddingTop: 40}} />

        <View style = {styles.buttoncontainer}>

          <TouchableOpacity
            style={styles.buttonshomepage}
            onPress={() => navigate('BeaconPage')}
          >
            <Text style = {styles.buttontext}>Beacons</Text>
          </TouchableOpacity>

          <Text style = {{paddingTop: 20}} />

          <TouchableOpacity
            style={styles.buttonshomepage}
            onPress={() => navigate('SettingsPage')}
          >
            <Text style = {styles.buttontext}>Settings</Text>
          </TouchableOpacity>

          <Text style = {{paddingTop: 20}} />
          
          {/*
          //
          // if user not logged in, display login button

          // if user is logged in, display logout button

          // when logged in, display user profile button

          // or you could have the user profile button link to login screen
          // if the user is not currently logged in
          //
          */}

          <Text style = {{paddingTop: 20}} />

        </View>

      </View>
    );
  }
}

const BeaconApp = StackNavigator({
  HomePage: { screen: HomeScreen },
  BeaconPage: { screen: BeaconScreen },
  UserProfilePage: { screen: UserProfileScreen },
  SettingsPage: { screen: SettingsScreen },
});


export default class App extends React.Component<{}> {
  render() {
    return <BeaconApp />;
  }
}
