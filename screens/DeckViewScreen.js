import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Grid, Row, Col, Card, CardItem, Button,Text, Left, Right } from 'native-base'
import MainContainer from '../components/MainContainer'
import colors from '../utils/colors'
import { connect } from 'react-redux';
class DeckViewScreen extends Component{    
  render() {
        const { deck } = this.props
        return (
          <MainContainer header title={this.props.title}>   
              <Grid >
                <Row style={{height:"100%"}}>
                  <Col>                          
                    <Card style={{marginTop:"auto", marginBottom: "auto"}}>
                      <CardItem header bordered>                
                          <Text style={{marginLeft: "auto", marginRight: "auto", fontSize: 25}}>
                            {deck.title}
                          </Text>            
                      </CardItem>
                      <CardItem bordered>                                           
                          <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize:20, color:colors.gray }}>
                            {deck.questions.length} cards
                          </Text>
                      </CardItem>    
                      <CardItem footer bordered>
                        <Left style={{padding:2}}>
                          <Button
                            style={{ width: "100%" }}
                            light
                            onPress={() => Actions.NewCard({deck: deck.title})}>
                            <Text style={{textAlign:"center", marginLeft: "auto", marginRight: "auto" }}>Add Card</Text>
                          </Button>
                        </Left>
                        <Right style={{padding:2}}>
                          <Button
                          style={{ width: "100%" }}
                          primary
                          disabled={deck.questions.length == 0}
                          onPress={() => Actions.QuizView({deck: deck.title})}>
                          <Text style={{marginLeft: "auto", marginRight: "auto" }}>Start Quiz</Text>
                          </Button> 
                        </Right>  
                      </CardItem>     
                    </Card>
                </Col>
              </Row>
            </Grid>
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

export default connect(mapStateToProps)(DeckViewScreen)