import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import Deck  from '../components/Deck'
import MainContainer from '../components/MainContainer'
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import {
  getSortCondition,
  getCurrentDate
} from '../utils/helpers'
import * as Animatable from 'react-native-animatable';
import Loading from '../components/Loading';
/**
 * Component that renders screen responsible for showing specific deck
 */
class HomeScreen extends Component {
  static propTypes = {
    decks: PropTypes.array.isRequired,
    cardsWerePlayedToday: PropTypes.bool.isRequired,
    fetchDecks: PropTypes.func.isRequired,
    onAddDeck: PropTypes.func.isRequired,
    onShowDeck: PropTypes.func.isRequired
  }

  state = {
    ready: false,
    selected:''
  }
   
  /**
   * Show selected deck
   */
  handleShowDeck = () => {
    this.props.onShowDeck(this.state.selected)
    this.clearSelectDeck()
  }
  /**
   * selects deck for animation
   * @param {string} title Title of deck
   */
  handleSelectDeck = (title) => {
    this.setState((state) => ({
      ...state,
      selected: title
    }))
  }
  /**
   * Clear selected deck
   */
  clearSelectDeck = () => {
    this.setState((state) => ({
      ...state,
      selected: ''
    }))
  }
  
  componentDidMount() {
    this.props.fetchDecks().then(() => this.setState((state) => ({
      ...state,
      ready: true
    })))   
  }

  render() {
    const { ready } = this.state
    if (ready === false){
      return (
        <Loading/>
      )
    }
    const { decks } = this.props   
    const { selected } = this.state    
      return (
        <MainContainer scrollbar footer title="Decks">
          {decks.map(item => {               
            const { index, title, body, lastQuiz } = item
            const{ correct, numQuestions, executedToday } = lastQuiz
            const animateDeck = selected === title  
            const deck = (<Deck key={`deck-${index}`}
                               title={title}
                               body={body}
                               index={index}
                               numQuestions={numQuestions}
                               correct={correct}
                               quizExecuted={executedToday}
                               onPress={() => this.handleSelectDeck(title)} />)
            return (
              animateDeck === true ?
                (<Animatable.View key={`animation-${(index)}`}
                  animation="swing"
                  iterationCount={1}
                  duration={600}
                  direction="normal"
                  onAnimationEnd={() => this.handleShowDeck()}>
                  {deck}
                </Animatable.View>)
              : deck)
          })}        
        </MainContainer>
    )
  }
}

const mapStateToProps = ({ decks }) => {  
  const today = getCurrentDate()
  const cardsWerePlayedToday = Object.keys(decks)
                                    .filter(key => decks[key].lastQuiz.date === today)
                                    .length > 0
  return {
    decks: Object.keys(decks)
      .sort((a, b) => getSortCondition(decks[a]['title'], decks[b]['title'], 'asc'))
      .map((key, index) => ({
        index: index + 1,
        title: decks[key].title,
        body: `${decks[key].questions.length} cards`,
        lastQuiz: {
          executedToday: decks[key].lastQuiz.date === today,
          numQuestions: decks[key].lastQuiz.correct + decks[key].lastQuiz.incorrect,
          correct: decks[key].lastQuiz.correct
        }
    })),
    cardsWerePlayedToday
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDecks: async() => {
      return handleReceiveDecks(dispatch)
    },
    onAddDeck: () => Actions.NewDeck(),
    onShowDeck: (title) => Actions.DeckView({ title })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)