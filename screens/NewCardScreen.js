import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Body, Card, CardItem, Form, Item, Button, Input, Text } from 'native-base'
import MainContainer from '../components/MainContainer'
import { handleAddCardToDeck } from '../actions'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { clearSuccess } from '../actions/success';
import { clearError } from '../actions/error';
import Loading from '../components/Loading'
import { showAlert } from '../utils/helpers';
import PropTypes from 'prop-types'
import { commomStyles } from '../utils/styles';
/**
 * Component that renders the screen responsible for adding a card to a deck
 */
class NewCardScreen extends Component{
  static propTypes = {
    deck: PropTypes.string.isRequired,
    success: PropTypes.bool.isRequired,
    error: PropTypes.object,
    onAddCard: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
    onClearSuccess: PropTypes.func.isRequired,
    onClearError: PropTypes.func.isRequired,
  }
  state = {
    question: '',
    answer: '',
    sending: false
  }
  handleChangeQuestion = (text) => {
    this.setState({
      question: text
    });
  }
  handleChangeAnswer = (text) => {
    this.setState({
      answer: text
    });
  }
  handleAddCard = () => {
    const { question, answer } = this.state
    const { deck, onAddCard } = this.props
    const card = {
      question,
      answer
    }
    this.startLoading()
    onAddCard(deck, card)
  }
  
  startLoading = () => {
    this.setState((state) => ({
      ...state,
      sending: true
    }))
  }
  stopLoading = () => {
    this.setState((state) => ({
      ...state,
      sending: false
    }))
  }
  componentWillReceiveProps(nextProps) {
    const { success, error, onGoBack, onClearSuccess, onClearError } = nextProps

    if (success) {
      onGoBack()
      onClearSuccess()
    }

    if (error) {
      showAlert(error.title, error.message)
      onClearError()
      this.stopLoading()
    }
  }
  
  render() { 
    const { question, answer, sending } = this.state
    if (sending) {
      return (
        <Loading/>
      )
    }
    const { deck } = this.props
        const empty = question === '' || answer === ''
        return (
          <MainContainer centerContentVertically header title="Add Card">
              <Card style={styles.centerVertically}>
                <CardItem header bordered>
                  <Text style={styles.cardHeaderText}>{deck}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Form style={styles.maxWidth}>
                      <Item regular style={{marginBottom:10}}>
                        <Input
                                placeholder="Question"
                                value={question}
                                onChangeText={this.handleChangeQuestion.bind(this)} />
                      </Item>
                      <Item regular>
                        <Input
                              placeholder="Answer"
                              value={answer}
                              onChangeText={this.handleChangeAnswer.bind(this)} />
                      </Item>
                    </Form> 
                </Body>
                </CardItem>    
                <CardItem footer bordered>
                    <Button
                      style={styles.maxWidth}
                      primary
                      disabled={empty}
                      onPress={() => this.handleAddCard()}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </Button>
                </CardItem>
            </Card>
          </MainContainer>
        )
    }
}

const mapStateToProps = ({ success, error }) => {
  return {
    success,
    error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCard: (deck, card) => {    
      handleAddCardToDeck(deck, card, dispatch)
    },
    onClearSuccess: () => dispatch(clearSuccess()),
    onClearError: () => dispatch(clearError()),
    onGoBack: () => Actions.pop()
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewCardScreen)