import React, { Component } from 'react'
import colors from '../utils/colors';
import { Actions } from 'react-native-router-flux'
import ProgressCircle from 'react-native-progress-circle' 
import { Col, Row, Grid, Body, Left, Right, Card, CardItem, Button, Text } from 'native-base'
export default class QuizResult extends Component{
    render() {
        const { deck, correct, numQuestions, restart } = this.props
        const total = Math.ceil(correct*100.00/numQuestions)
        return ( <Grid >
            <Row style={{height:"100%"}}>
              <Col>                          
                <Card style={{marginTop:"auto", marginBottom: "auto"}}>
                  <CardItem header bordered>                
                      <Text style={{textAlign: "center", marginLeft: "auto", marginRight: "auto", fontSize: 25}}>
                        {deck}
                      </Text>            
                  </CardItem>
                  <CardItem bordered>    
                    <Body>

                        <ProgressCircle    
                            outerCircleStyle={{marginLeft: "auto", marginRight: "auto"}}         
                            percent={total}
                            radius={50}
                            borderWidth={8}
                            color="#3399FF"
                            shadowColor="#999"
                            bgColor="#fff"
                        >
                            <Text style={{ fontSize: 20 }}>{total}%</Text>
                        </ProgressCircle>
                        <Text style={{ marginLeft: "auto", marginRight: "auto", fontSize:20, color:colors.purple }}>
                             Correct
                        </Text>
                    </Body>                     
                  </CardItem>    
                  <CardItem footer bordered>
                    <Left style={{padding:2}}>
                      <Button
                        style={{ width: "100%" }}
                        primary
                        onPress={() => restart()}>
                        <Text style={{textAlign:"center", marginLeft: "auto", marginRight: "auto" }}>Restart Quiz</Text>
                      </Button>
                    </Left>
                    <Right style={{padding:2}}>
                      <Button
                      style={{ width: "100%" }}
                      light
                      onPress={() => Actions.pop()}>
                      <Text style={{textAlign:"center", marginLeft: "auto", marginRight: "auto" }}>Back to Deck</Text>
                      </Button> 
                    </Right>  
                  </CardItem>     
                </Card>
            </Col>
          </Row>
        </Grid>)
    }
}