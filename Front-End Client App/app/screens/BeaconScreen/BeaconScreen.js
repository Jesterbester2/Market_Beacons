import React from 'react';
import { Button, Text, Image, View, ListView, DeviceEventEmitter, TouchableOpacity, Modal, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Beacons from 'react-native-beacons-manager';

import { NotificationsAndroid } from 'react-native-notifications';

// import style sheets
import styles from '../../styles/styles.js'

export default class BeaconScreen extends React.Component {
  static navigationOptions = {
    title: 'Beacons',
  };
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      // region information
      uuidRef: 'b9407f30-f5f8-466e-aff9-25556b57fe6d',
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([]),
      // Modal
      modalVisible: false,
      // image location or url
      url: '',
      // style the size of ad
      adWidth: 0,
      adHeight: 0,
    };

    this.onPressBeacon = this.onPressBeacon.bind(this);

    this._isMounted = false;
  }

  componentWillMount() {
    //
    // ONLY non component state aware here in componentWillMount
    //
    // only detect beacons when scanning is enabled
    if (global.scanningEnabled === true){
      Beacons.detectIBeacons();


      //
      // Set scan period to keep beacons from dropping, if the time between scans
      // and the beacon advertise interval overlap it will drop for a second
      //
      Beacons.setForegroundScanPeriod(6000);

      const uuid = this.state.uuidRef;
      Beacons
        .startRangingBeaconsInRegion(
          'REGION1',
          uuid
        )
        .then(
          () => console.log('Beacons ranging started succesfully')
        )
        .catch(
          error => console.log(`Beacons ranging not started, error: ${error}`)
        );
    }
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //
    // Ranging:

    this._isMounted = true;

    if (global.scanningEnabled === true){
      this.beaconsDidRange = DeviceEventEmitter.addListener(
        'beaconsDidRange',
        (data) => {
          var beaconList = data.beacons.map((beacon) => {
            return beacon.major;
          });

          if (this._isMounted){
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(beaconList)
            });
          }

        }
      );
    }
  }

  componentWillUnMount(){
    this._isMounted = false;
    this.beaconsDidRange.remove()
    this.beaconsDidRange = null;
    Beacons.stopRangingBeaconsInRegion()
    this.state.dataSource.cloneWithRows([])
  }

  render() {
    const { dataSource } =  this.state;
    return (

      <View style={styles.container}>
        <Text style={styles.headline}>
          Beacons Nearby
        </Text>
        <ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={this.renderRow}
        />

        <View style={styles.modalView}>
          <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
                <Text style={{fontSize: 20}}>
                This is your ad. Enjoy!
                </Text>
                <Text style = {{paddingTop: 20}} />
                <Image
                  style={{width: this.state.adWidth, height: this.state.adHeight}}
                  source={{uri: this.state.url}}
                />
                <Text style = {{paddingTop: 20}} />
                <Button
                    onPress={() => this.closeModal()}
                    title="Close"
                >
                </Button>
              </View>
            </View>
          </Modal>
          </View>
      </View>

      );
  }

  renderRow = rowData => {
    return (
      <View style={styles.row}>

        <Text style = {{paddingTop: 20}} />

        <TouchableOpacity
          style={styles.buttonsbeacons}
          onPress={(pressed) => this.onPressBeacon(pressed, rowData)}
        >
          <Text style = {styles.buttontext}>{rowData}</Text>
        </TouchableOpacity>


      </View>
    );
  }

  openModal(url, width, height) {
    this.setState({
      modalVisible:true,
      url: url,
      adWidth: width,
      adHeight: height
    });
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  onPressBeacon(pressed, major) {

    if (major === 1) {
      this.openModal('https://i.imgur.com/evUd0TU.jpg', 350, 479);
    }
    if (major === 2) {
      this.openModal('https://i.imgur.com/Yl6GdRl.jpg', 350, 499);
      NotificationsAndroid.localNotification({
      	title: "Beacon Notification",
      	body: "You pressed beacon 2!",
      	extra: "data"
      });
    }
    if (major === 3) {
      this.openModal('https://i.imgur.com/N4GSZOY.jpg', 350, 233);
    }

  }

}
