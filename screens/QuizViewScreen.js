import React, { Component } from 'react'
import QuizCard from '../components/QuizCard'
import QuizScore from '../components/QuizScore'
import MainContainer from '../components/MainContainer'
import { connect } from 'react-redux'
import { addCorrect, addIncorrect, restartQuiz } from '../actions/quiz'
import { handleSetCompletedQuiz } from '../actions'
import { getCurrentDate } from '../utils/helpers'
import { clearSuccess } from '../actions/success'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux';
/**
 * Screen responsible for starting a new test and showing the result
 */
class QuizViewScreen extends Component{  
  static propTypes = {
    card: PropTypes.object,
    numQuestions :PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    completed : PropTypes.bool.isRequired,
    incorrect: PropTypes.number.isRequired,
    correct: PropTypes.number.isRequired,
    dailyQuizSaved: PropTypes.bool.isRequired,
    onAddCorrect: PropTypes.func.isRequired,
    onAddIncorrect: PropTypes.func.isRequired,
    onSetCompletedQuiz: PropTypes.func.isRequired,
    onRestartQuiz: PropTypes.func.isRequired,
    onClearSuccess: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
  }

  handleAddCorrect = () => {
      const { deck, onAddCorrect } = this.props
      onAddCorrect(deck)
  }

  handleAddIncorrect = () => {
    const { deck, onAddIncorrect } = this.props
    onAddIncorrect(deck)
  }

  handleRestart = () => this.props.onRestartQuiz()
   
  handleGoBack = () => this.props.onGoBack()

  componentWillReceiveProps(nextProps){
    const { deck, completed, dailyQuizSaved, correct, incorrect, onSetCompletedQuiz } = nextProps
    if (completed && !dailyQuizSaved) {      
      onSetCompletedQuiz(deck, correct, incorrect)
    }
  }

  render() {        
    const { card, deck, correct, completed, numQuestions, current } = this.props   
      if (completed === true) {
          return (<MainContainer centerContentVertically header title="Quiz">
                    <QuizScore deck={deck}
                                correct={correct}
                                numQuestions={numQuestions}
                                onGoBack={() => this.handleGoBack()}
                                onRestart={() => this.handleRestart()} />
                  </MainContainer>)
      }
      return (
        <MainContainer centerContentVertically header title="Quiz">
          <QuizCard
            item={`${(current + 1)}/${numQuestions}`}
            onAddCorrect={() => this.handleAddCorrect()}
            onAddIncorrect={() => this.handleAddIncorrect()}
            deck={deck}
            question={card.question}
            answer={card.answer} />
        </MainContainer>
      )
    }
}

const mapStateToProps = ({ decks, quiz }, { deck }) => {
  const { correct, incorrect } = quiz
  const total = correct + incorrect
  const current = total
  const selectedDeck = decks[deck]
  const completed = (total === selectedDeck.questions.length)
  
  const dailyQuizSaved = completed &&
    selectedDeck.lastQuiz.date === getCurrentDate() &&
    selectedDeck.lastQuiz.correct === correct &&
    selectedDeck.lastQuiz.incorrect === incorrect
  
  return {
    card: completed ? null : selectedDeck.questions[current],
    numQuestions :selectedDeck.questions.length,
    current,
    completed,
    incorrect,
    correct,
    dailyQuizSaved
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCorrect: (deck) => {
     dispatch(addCorrect(deck))
    },
    onAddIncorrect: (deck) => {
      dispatch(addIncorrect(deck))
    },
    onClearSuccess: () => {
      dispatch(clearSuccess())
    },
    onRestartQuiz: () => {
      dispatch(restartQuiz())
    },
    onGoBack: () => {
      Actions.pop()  
    },
    onSetCompletedQuiz: (deck, correct, incorrect) => {
      handleSetCompletedQuiz(deck, correct, incorrect, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizViewScreen)