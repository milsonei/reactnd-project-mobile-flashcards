import React from 'react'
import colors from '../utils/colors'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Body, Card, CardItem, Text } from 'native-base'
import { commomStyles } from '../utils/styles';
/**
 * Component that renders quiz back card
 * @param {any} props 
 */
const QuizBackCard = (props) => {
    const { answer } = props
    return (
        <Card style={styles.centerVertically}>
        <CardItem header bordered>
            <Body>
              <Text style={styles.cardHeaderText}>
                {answer}
              </Text>
            </Body> 
          </CardItem>
          <CardItem bordered>
            <Body>
              <Text style={styles.cardBodyText}>
              Show Question
              </Text>
            </Body>
          </CardItem>
          <CardItem footer bordered>
              <Body style={{height:50}}>
                
              </Body>
          </CardItem>
        </Card>
    )
}

const styles = StyleSheet.create({
  maxWidth: {
    ...commomStyles.maxWidth
  },  
  centerVertically: {
    ...commomStyles.centerVertically
  },
  cardHeaderText: {
    ...commomStyles.centerText,
    ...commomStyles.centerHorizontally,
    fontSize: 20
  },
  cardBodyText: {
    fontWeight: "bold",
    color: colors.gray,
    ...commomStyles.centerHorizontally,
  }
})

QuizBackCard.propTypes = {
  answer: PropTypes.string.isRequired
}

export default QuizBackCard