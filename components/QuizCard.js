import React, { Component } from 'react'
import FlipCard from 'react-native-flip-card'
import { Col, Row, Grid, Badge, Body, Card, CardItem, Button, Icon, Text } from 'native-base'
import colors from '../utils/colors'
export default class QuizCard extends Component{      
  render() {
      const { deck, question, answer, handleAddCorrect, handleAddIncorrect, item} = this.props
        return (          
                <FlipCard
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
                >
                  <Card style={{marginTop:"auto", marginBottom: "auto"}}>
                  <CardItem header bordered> 
                    <Body style={{height:100}}>
                        <Grid>
                          <Row>
                            <Col style={{width:"20%", padding:5}}>
                              <Badge info style={{marginLeft: "auto", marginRight: "auto"}}>
                                  <Text>{item}</Text>
                              </Badge> 
                            </Col>
                            <Col style={{width:"80%", padding:5}}>
                              <Badge success style={{marginLeft: "auto", marginRight: "auto"}}>
                                <Text>{deck}</Text>
                              </Badge>
                            </Col>                          
                          </Row>
                          <Row>
                            <Col style={{width:"100%", padding:5}}>
                              <Text style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", fontSize: 25 }}>
                              {question}
                              </Text>
                            </Col>
                          </Row>
                        </Grid>
                      </Body>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={{fontWeight:"bold", color:colors.gray, marginLeft:"auto", marginRight:"auto"}}>
                          Show Answer
                        </Text>
                      </Body>
                    </CardItem>
                    <CardItem footer bordered>
                      <Body style={{height:50}}>
                        <Grid>
                          <Row>
                            <Col style={{width:"50%", padding:5}}>
                              <Button style={{ width: "100%" }}
                                      success
                                      onPress={() => handleAddCorrect()}>
                                <Text style={{marginLeft: "auto", marginRight: "auto" }}>
                                  Correct
                                </Text>
                              </Button>
                            </Col>                          
                            <Col style={{width:"50%", padding:5}}>
                              <Button style={{ width: "100%" }}
                                      danger
                                      onPress={() => handleAddIncorrect()}>
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
                  <Card style={{marginTop:"auto", marginBottom: "auto"}}>
                  <CardItem header bordered>
                      <Body>
                        <Text style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto", fontSize: 20 }}>
                          {answer}
                        </Text>                      
                      </Body> 
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={{fontWeight:"bold", color:colors.gray, marginLeft:"auto", marginRight:"auto"}}>
                        Show Question
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