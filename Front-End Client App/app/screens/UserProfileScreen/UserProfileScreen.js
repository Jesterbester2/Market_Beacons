import React from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// import style sheets
import styles from '../../styles/styles.js'

export default class UserProfileScreen extends React.Component{
  static navigationOptions = {
    title: 'User Profile'
  };

  render() {
    return (
      <View style = {{paddingTop: 10}}>
        <Text style = {{fontSize: 20}} >User Profile Page</Text>
      </View>
    );
  }
}
