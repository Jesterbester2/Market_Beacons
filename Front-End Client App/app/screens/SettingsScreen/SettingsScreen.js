import React from 'react';
import { View, Image } from 'react-native';
import SettingsList from 'react-native-settings-list';
import { StackNavigator } from 'react-navigation';

// import style sheets
import styles from '../../styles/styles.js'

export default class SettingsScreen extends React.Component{
  static navigationOptions = {
    title: 'Settings'
  };

  constructor(){
    super();

    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      switchValue: global.scanningEnabled,
    };
  }

  render() {
    return (
      <View style={{backgroundColor:'#f6f6f6',flex:1}}>
        <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
          <SettingsList.Item
            hasNavArrow={false}
            title='General'
            titleStyle={{color:'#009688', marginBottom:10, fontWeight:'500'}}
            itemWidth={50}
            borderHide={'Both'}
          />
          <SettingsList.Item
            icon={
              <View style={styles.imageStyle}>
                <Image style={{alignSelf:'center',height:22, width:22}} source={require('../../images/bluetooth.png')}/>
              </View>
            }
            hasNavArrow={false}
            itemWidth={70}
            titleStyle={{color:'black', fontSize: 16}}
            title='Enable beacon scanning'
            hasSwitch={true}
            switchState={this.state.switchValue}
            switchOnValueChange={this.onValueChange}
          />
          <SettingsList.Item
            icon={
              <View style={styles.imageStyle}>
                <Image style={{alignSelf:'center',height:4, width:18}} source={require('../../images/more.png')}/>
              </View>
            }
            title='More'
            itemWidth={70}
            titleStyle={{color:'black', fontSize: 16}}
            hasNavArrow={false}
          />
        </SettingsList>
      </View>
      );
  }
  onValueChange(value){
     this.setState({switchValue: value});
     if (value === true){
       global.scanningEnabled = true;
     }
     if (value === false){
       global.scanningEnabled = false;
     }
  }
}
