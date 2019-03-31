import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import FlipCard from 'react-native-flip-card'
import { Body, Card, CardItem, Button,Text } from 'native-base'
import { Col, Row, Grid } from 'react-native-easy-grid';
import colors from '../utils/colors'
export default class QuizCard extends Component{  
    render(){
        return (          
                <FlipCard
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
                >
                  <Card style={{alignContent: "center"}}>
                    <CardItem header bordered>
                      <Text style={{marginLeft:"auto", marginRight:"auto", fontSize:30}}>{this.props.answer}</Text>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={{fontWeight:"bold", color:colors.gray, marginLeft:"auto", marginRight:"auto"}}>
                          Answer
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer bordered>
                      <Body style={{height:50}}>
                        <Grid>
                          <Row>
                            <Col style={{width:"50%", padding:5}}>
                              <Button style={{width:"100%"}} success>
                                <Text style={{marginLeft: "auto", marginRight: "auto" }}>
                                  Correct
                                </Text>
                              </Button>
                            </Col>
                            <Col style={{width:"50%", padding:5}}>
                              <Button style={{width:"100%"}} danger>
                                <Text style={{marginLeft: "auto", marginRight: "auto" }}>
                                  Incorrect
                                </Text>
                              </Button>
                            </Col>
                          </Row>
                        </Grid>
                      </Body>
                    </CardItem>
                    </Card>                 
                  <Card style={{alignContent: "center"}}>
                      <CardItem header bordered>
                        <Text style={{marginLeft:"auto", marginRight:"auto", fontSize:30}}>{this.props.question}</Text>
                      </CardItem>
                      <CardItem bordered>
                        <Body>
                          <Text style={{fontWeight:"bold", color:colors.gray, marginLeft:"auto", marginRight:"auto"}}>
                          Question
                          </Text>
                        </Body>
                      </CardItem>
                      <CardItem footer bordered>
                        <Body style={{height:50}}>
                          
                        </Body>
                      </CardItem>
                    </Card>            
                </FlipCard>
        )
    }
}