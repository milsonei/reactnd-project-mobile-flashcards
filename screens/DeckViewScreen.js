import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Card, CardItem, Button,Text, Left, Right } from 'native-base'
import MainContainer from '../components/MainContainer'
import colors from '../utils/colors'
import { connect } from 'react-redux';
import { restartQuiz } from '../actions/quiz';
import PropTypes from 'prop-types'
import { commomStyles } from '../utils/styles';
/**
 * Component that renders the screen responsible for displaying a deck, 
 * allowing you to add a card and start the quiz
 */
class DeckViewScreen extends Component{    
  static propTypes = {
    deck: PropTypes.object.isRequired,
    onStartQuiz: PropTypes.func.isRequired,
    onAddCard: PropTypes.func.isRequired,
    resetQuiz: PropTypes.bool.isRequired
  }
  handleStartQuiz = () => {
    const { deck, onStartQuiz, resetQuiz } = this.props
    onStartQuiz(deck.title, resetQuiz)
  }
  handleAddNewCard = () => {
    const { deck, onAddCard } = this.props
    onAddCard(deck.title)
  }
  render() {
        const { deck } = this.props
        return (
          <MainContainer centerContentVertically header title={deck.title}>
            <Card style={styles.centerVertically}>
              <CardItem header bordered>
                  <Text style={styles.cardHeaderText}>
                    {deck.title}
                  </Text>
              </CardItem>
              <CardItem bordered>
                  <Text style={styles.cardBodyText}>
                    {deck.questions.length} cards
                  </Text>
              </CardItem>
              <CardItem footer bordered>
                <Left style={{padding:2}}>
                  <Button
                    style={styles.maxWidth}
                    light
                    onPress={() => this.handleAddNewCard()}>
                    <Text style={styles.buttonText}>Add Card</Text>
                  </Button>
                </Left>
                <Right style={{padding:2}}>
                  <Button
                    style={styles.maxWidth}
                    primary
                    disabled={deck.questions.length == 0}
                    onPress={() => this.handleStartQuiz()}>
                  <Text style={styles.buttonText}>Start Quiz</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </MainContainer>
        )
    }
}

const mapStateToProps = ({ decks, quiz }, { title } ) => {
  const deck = decks[title]
  return {
    deck,
    resetQuiz: quiz.deck && quiz.deck !== title ? true : false
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStartQuiz: (deck, resetQuiz) => {
      if (resetQuiz) {
        dispatch(restartQuiz())
      }
      Actions.QuizView({ deck })
    },
    onAddCard: (deck) => {
      Actions.NewCard({ deck })
    }
  }
}

const styles = StyleSheet.create({
  maxWidth: {
    ...commomStyles.maxWidth
  },  
  centerVertically: {
    ...commomStyles.centerVertically
  },
  buttonText: {
    ...commomStyles.centerText, 
    ...commomStyles.centerHorizontally
  },
  cardHeaderText: {
    ...commomStyles.centerHorizontally,
    fontSize: 25
  },
  cardBodyText: {
    ...commomStyles.centerHorizontally,
    fontSize: 20,
    color: colors.gray
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckViewScreen)