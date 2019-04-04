import React from 'react';
import { Image } from 'react-native'
/**
 * Component that renders a image
 */
function LogoTitle(){
      return (
        <Image          
          source={require('../logo.png')}
          style={{ width: 30, height: 30 }}
        />
      );
}

export default LogoTitle