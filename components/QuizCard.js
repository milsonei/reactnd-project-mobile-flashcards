import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlipCard from 'react-native-flip-card'
import QuizFrontCard from './QuizFrontCard';
import QuizBackCard from './QuizBackCard';
/**
 * Component that renders quiz card
 * @param {any} props 
 */
class QuizCard extends Component{
  handleAddCorrect = () => this.props.onAddCorrect()
  handleAddIncorrect = () => this.props.onAddIncorrect()
  render() {
      const { deck, question, answer, item } = this.props
        return (          
                <FlipCard
                flipHorizontal
                flipVertical={false}
                flip={false}
                clickable>
                  <QuizFrontCard deck={deck}
                                 question={question}
                                 onAddCorrect={this.handleAddCorrect}
                                 onAddIncorrect={this.handleAddIncorrect}
                                 item={item} />
                  <QuizBackCard answer={answer}/>
                </FlipCard>
        )
    }
}

QuizCard.propTypes = { 
  deck: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  onAddCorrect: PropTypes.func.isRequired,
  onAddIncorrect: PropTypes.func.isRequired,
  item: PropTypes.string.isRequired
}

export default QuizCard