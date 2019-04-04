import React, { Component } from 'react'
import { View } from 'react-native'
import { Font, AppLoading } from "expo"
import NativeBaseApp from './NativeBaseApp'
import { showAlert } from './utils/helpers';
import notificator from './utils/MyNotificator';
export default class App extends Component {
  state = {
    loading: true
  }
  /**
   * Show notification alert after schedule date expires
   * @param {any} notification 
   */
  handleNotification = (title, body) => {   
    showAlert(title, body)                   
  }

  async componentWillMount() {
    notificator.listenForNotifications(this.handleNotification)
    notificator.setLocalNotification()
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  
  render() {
      if (this.state.loading) {
        return (
          <View>
            <AppLoading />
          </View>
        );
      }      
    return (
      <NativeBaseApp/>
    );
  }
}