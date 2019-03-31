
import React from 'react';
import colors from '../utils/colors'
import { Body, Card, CardItem, Text } from 'native-base';
export function Deck(props) {
  const { onPress } = props
  const buttonPros = {}
  if (onPress) {
    buttonPros.onPress = onPress;
    buttonPros.button = true;
  }
  return (
    <Card style={{alignContent:"center"}}>
      <CardItem header bordered {...buttonPros}>
        <Text style={{marginLeft:"auto", marginRight:"auto", fontSize:25}}>{props.title}</Text>
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={{fontSize:20, color:colors.gray, marginLeft:"auto", marginRight:"auto"}}>
            {props.body}
          </Text>
        </Body>
      </CardItem>    
    </Card>
  )
}