import React, { Component } from 'react'
import colors from '../utils/colors';
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Body, Left, Right, Card, CardItem, Button, Text } from 'native-base'
import QuizPercentageInfo from './QuizPercentageInfo'
import { commomStyles } from '../utils/styles';
/**
 * Component that renders quiz result
 */
export default class QuizScore extends Component{
     static propTypes = {
       deck: PropTypes.string.isRequired,
       correct: PropTypes.number.isRequired,
       numQuestions: PropTypes.number.isRequired,
       onRestart: PropTypes.func.isRequired,
       onGoBack: PropTypes.func.isRequired
    }
    handleRestart = () => this.props.onRestart()
    handleGoBack = () => this.props.onGoBack()
    render() {
        const { deck, correct, numQuestions } = this.props
        return (                         
                <Card style={styles.centerVertically}>
                  <CardItem header bordered>                
                      <Text style={styles.cardHeaderText}>
                        {deck}
                      </Text>            
                  </CardItem>
                  <CardItem bordered>    
                    <Body>
                        <QuizPercentageInfo size="big" correct={correct} numQuestions={numQuestions}/>
                        <Text style={styles.cardBodyText}>
                              Correct
                        </Text>
                    </Body>                     
                  </CardItem>    
                  <CardItem footer bordered>
                    <Left style={{padding:2}}>
                      <Button
                        style={{ width: "100%" }}
                        primary
                        onPress={() => this.handleRestart()}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                      </Button>
                    </Left>
                    <Right style={{padding:2}}>
                      <Button
                      style={{ width: "100%" }}
                      light
                      onPress={() => this.handleGoBack()}>
                      <Text style={styles.buttonText}>Back to Deck</Text>
                      </Button> 
                    </Right>  
                  </CardItem>     
                </Card>)
    }
}

const styles = StyleSheet.create({  
  centerVertically: {
    ...commomStyles.centerVertically
  },
  buttonText: {
    ...commomStyles.centerText, 
    ...commomStyles.centerHorizontally
  },
  cardHeaderText: {
    ...commomStyles.centerText, 
    ...commomStyles.centerHorizontally,
    fontSize: 25
  },
  cardBodyText: {
    ...commomStyles.centerHorizontally,
    fontSize: 20,
    color: colors.purple
  }
})