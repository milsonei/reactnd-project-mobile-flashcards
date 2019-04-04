import React from 'react'
import colors from '../utils/colors'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { commomStyles } from '../utils/styles'
import { Col, Row, Grid, Badge, Body, Card, CardItem, Button, Text } from 'native-base'
/**
 * Component that renders quiz front card
 * @param {any} props 
 */
const QuizFrontCard = (props) => {
    const { deck, question, onAddCorrect, onAddIncorrect, item} = props
    return (
        <Card style={styles.centerVertically}>
        <CardItem header bordered> 
          <Body style={{height:100}}>
              <Grid>
                <Row>
                  <Col style={{width:"20%", padding:5}}>
                    <Badge info style={styles.centerHorizontally}>
                        <Text>{item}</Text>
                    </Badge> 
                  </Col>
                  <Col style={{width:"80%", padding:5}}>
                    <Badge success style={styles.centerHorizontally}>
                      <Text>{deck}</Text>
                    </Badge>
                  </Col>
                </Row>
                <Row>
                  <Col style={{width:"100%", padding:5}}>
                    <Text style={styles.cardHeaderText}>
                    {question}
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={styles.cardBodyText}>
                Show Answer
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Body style={{height:50}}>
              <Grid>
                <Row>
                  <Col style={{width:"50%", padding:5}}>
                    <Button style={styles.maxWidth}
                            success
                            onPress={() => onAddCorrect()}>
                      <Text style={styles.centerHorizontally}>
                        Correct
                      </Text>
                    </Button>
                  </Col>                          
                  <Col style={{width:"50%", padding:5}}>
                    <Button style={styles.maxWidth}
                            danger
                            onPress={() => onAddIncorrect()}>
                      <Text style={styles.centerHorizontally}>
                        Incorrect
                      </Text>
                    </Button>
                  </Col>
                </Row>
              </Grid>
            </Body>
          </CardItem>
          </Card>
    )
}

const styles = StyleSheet.create({
  maxWidth: {
    ...commomStyles.maxWidth,
  },  
  centerVertically: {
    ...commomStyles.centerVertically,
  },
  centerHorizontally: {
    ...commomStyles.centerHorizontally,
  },
  buttonText: {
    ...commomStyles.centerHorizontally,
    ...commomStyles.centerText,
  },
  cardHeaderText: {
    ...commomStyles.centerHorizontally,
    ...commomStyles.centerText,
    fontSize: 25
  },
  cardBodyText: {
    fontWeight: "bold",
    color: colors.gray,
    ...commomStyles.centerHorizontally
  }
})

QuizFrontCard.propTypes = { 
  deck: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  onAddCorrect: PropTypes.func.isRequired,
  onAddIncorrect: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired
}

export default QuizFrontCard