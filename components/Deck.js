
import React from 'react';
import colors from '../utils/colors'
import QuizPercentageInfo from './QuizPercentageInfo'
import { Grid, Row, Col, Body, Card, CardItem, Text, Badge } from 'native-base';
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { commomStyles } from '../utils/styles';
/**
 * Component that renders a deck showing the title and number of cards
 * @param {any} props 
 */
function Deck(props) { 
  const { onPress, quizExecuted, correct, index, numQuestions, title, body } = props
  const buttonPros = {}
  if (onPress) {
    buttonPros.onPress = onPress;
    buttonPros.button = true;
  }
  return (
    <Card style={styles.center}>
      <CardItem header bordered {...buttonPros}>
        <Body>
          <Grid>
            <Row>
              <Col style={{width:"15%"}}>
                <Badge info style={styles.centerVertically}>
                    <Text>{index}</Text>
                </Badge> 
              </Col>                          
              <Col style={{width:"75%", padding:5}}>
                <Text style={styles.cardHeaderText}>{title}</Text>
              </Col>
              <Col style={{width:"10%"}}>
                {quizExecuted && (<QuizPercentageInfo
                                    size="small"
                                    correct={correct}
                                    numQuestions={numQuestions} />)}
              </Col>    
            </Row>                       
          </Grid>
        </Body>        
      </CardItem>
      <CardItem bordered>
        <Body>
          <Text style={styles.cardFooterText}>
            {body}
          </Text>
        </Body>
      </CardItem>    
    </Card>
  )
}

const styles = StyleSheet.create({
  center: {
    ...commomStyles.centerContent
  },
  centerVertically: {
    ...commomStyles.centerVertically
  },
  cardHeaderText: {
    color: colors.purple,
    fontWeight: "bold",
    fontSize: 20,
    ...commomStyles.centerHorizontally
  },
  cardFooterText:{
    fontSize: 20,
    color: colors.gray,
    ...commomStyles.centerHorizontally
  }
})

Deck.propTypes = { 
  quizExecuted: PropTypes.bool.isRequired,
  correct: PropTypes.number.isRequired,
  numQuestions: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Deck