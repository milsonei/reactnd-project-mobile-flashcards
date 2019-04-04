
import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from "expo";
import colors from '../utils/colors';
/**
 * Component that renders top status bar
 * @param {any} props
 */
function TopStatusBar() {  
  return (
    <View style={{ backgroundColor:colors.purple, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={colors.purple} barStyle='light-content'/>
    </View>
  )
}

export default TopStatusBar