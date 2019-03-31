import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Card, CardItem, Button,Text, Left, Right } from 'native-base'
import MainContainer from '../components/MainContainer'
import colors from '../utils/colors'
import { connect } from 'react-redux';
class DeckView extends Component{    
  render() {
        const { deck } = this.props
        return (
          <MainContainer title={this.props.title}>
            <Card style={{alignContent:"center"}}>
              <CardItem header bordered>
                <Text style={{marginLeft:"auto", marginRight:"auto", fontSize:25}}>{deck.title}</Text>
              </CardItem>
              <CardItem bordered>             
                <Text style={{fontSize:20, color:colors.gray, marginLeft:"auto", marginRight:"auto"}}>
                  {deck.questions.length} cards
                </Text>
              </CardItem>    
              <CardItem footer bordered>
                <Left style={{padding:2}}>
                  <Button
                    style={{ width: "100%" }}
                    light
                    onPress={() => Actions.NewCard({deck: deck.title})}>
                    <Text style={{marginLeft: "auto", marginRight: "auto" }}>Add Card</Text>
                  </Button>
                </Left>
                <Right style={{padding:2}}>
                  <Button
                  style={{ width: "100%" }}
                  primary
                  onPress={() => Actions.QuizView({deck: deck.title})}>
                  <Text style={{marginLeft: "auto", marginRight: "auto" }}>Start Quiz</Text>
                  </Button> 
                </Right>  
              </CardItem>     
            </Card>  
          </MainContainer>
        )
    }
}

const mapStateToProps = ({ decks }, { title } ) => {
  const deck = decks[title]
  return {
    deck
  }
}

export default connect(mapStateToProps)(DeckView)