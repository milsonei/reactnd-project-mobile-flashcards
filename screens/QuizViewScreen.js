import React, { Component } from 'react'
import QuizCard from '../components/QuizCard'
import QuizResult from '../components/QuizResult'
import MainContainer from '../components/MainContainer'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'native-base'
import { addCorrect, addIncorrect, restartQuiz } from '../actions/quiz';
import { Actions } from 'react-native-router-flux'
class QuizViewScreen extends Component{  
  handleAddCorrect = () => {
      const { deck, addCorrect } = this.props
      addCorrect(deck)
  }

  handleAddIncorrect = () => {
    const { deck, addIncorrect } = this.props
    addIncorrect(deck)
  }

  handleRestart = () => {
      this.props.restart()
  }

  render() {        
    const { card, deck, correct, completed, numQuestions, current } = this.props   
      if (completed === true) {
          return (<MainContainer header title="Quiz">
                    <QuizResult deck={deck}
                                correct={correct}
                                numQuestions={numQuestions}
                                restart={() => this.handleRestart()} />
                  </MainContainer>)
      }
      return (
        <MainContainer header title="Quiz">
          <Grid>
            <Row style={{ height: "100%" }}>
              <Col>
                <QuizCard
                  item={`${(current + 1)}/${numQuestions}`}
                  handleAddCorrect={() => this.handleAddCorrect()}
                  handleAddIncorrect={() => this.handleAddIncorrect()}
                  deck={deck}
                  question={card.question}
                  answer={card.answer} />
              </Col>
            </Row>
          </Grid>
        </MainContainer>
      )
    }
}

const mapStateToProps = ({ decks, flux, quiz }, { deck }) => {
  const { data } = flux
  const { correct, incorrect, deck: deckName } = quiz
  const total = deckName === deck ? correct + incorrect : 0
  const current = total
  const selectedDeck = decks[deck]
  const completed = (total === selectedDeck.questions.length)  
  return {
    card: completed ? null : selectedDeck.questions[current],
    numQuestions :selectedDeck.questions.length,
    current,
    completed,
    correct,
    data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCorrect: (deck, current) => {
     dispatch(addCorrect(deck, current))
    },
    addIncorrect: (deck, current) => {
      dispatch(addIncorrect(deck, current))
    },
    restart: () => {
      dispatch(restartQuiz())
    },
    goBack: () => Actions.pop()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizViewScreen)