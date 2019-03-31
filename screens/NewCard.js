import React, { Component } from 'react'
import { Body, Card, CardItem, Form, Item, Button, Input, Text } from 'native-base'
import MainContainer from '../components/MainContainer'
import { handleAddCardToDeck } from '../actions'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { clearSuccess } from '../actions/success';
import { clearError } from '../actions/error';
import Loading from '../components/Loading'
import { showAlert } from '../utils/helpers';
class NewCard extends Component{
  state = {
    question: '',
    answer: '',
    sending: false
  }
  onChangeQuestion(text) {
    this.setState({
      question: text
    });
  }
  onChangeAnswer(text) {
    this.setState({
      answer: text
    });
  }
  handleAddCard() {
    const { question, answer } = this.state
    const { deck, addCard } = this.props
    const card = {
      question,
      answer
    }
    this.startLoading()
    addCard(deck, card)
  }
  startLoading() {
    this.setState((state) => ({
      ...state,
      sending: true
    }))
  }
  stopLoading() {
    this.setState((state) => ({
      ...state,
      sending: false
    }))
  }
  componentWillReceiveProps(nextProps) {
    const { success, error, goBack, clearSuccess, clearError } = nextProps

    if (success) {
      goBack()
      clearSuccess()
    }

    if (error) {
      showAlert(error.title, error.message)
      clearError()
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
          <MainContainer title="Add Card">
            <Card>
              <CardItem header bordered>
                <Text style={{marginLeft:"auto", marginRight:"auto", fontSize:25}}>{deck}</Text>
              </CardItem>
              <CardItem bordered>
                <Body>
                  <Form style={{width:"100%"}}>
                    <Item regular style={{marginBottom:10}}>
                      <Input                             
                              placeholder="Question"
                              value={question}
                              onChangeText={this.onChangeQuestion.bind(this)} />
                    </Item>
                    <Item regular>
                      <Input                          
                            placeholder="Answer"
                            value={answer}
                            onChangeText={this.onChangeAnswer.bind(this)} />
                    </Item>
                  </Form> 
               </Body>
              </CardItem>    
              <CardItem footer bordered>
                  <Button
                    style={{ width: "100%" }}
                    primary
                    disabled={empty}
                    onPress={() => this.handleAddCard()}>
                    <Text style={{marginLeft: "auto", marginRight: "auto" }}>Submit</Text>
                  </Button>               
              </CardItem>     
            </Card>  
          </MainContainer>
        )
    }
}

const mapStateToProps = ({ flux, success, error }) => {
  const { data } = flux  
  return {
    data,
    success,
    error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (deck, card) => {    
      handleAddCardToDeck(deck, card, dispatch)
    },
    clearSuccess: () => dispatch(clearSuccess()),
    clearError: () => dispatch(clearError()),
    goBack: () => Actions.pop()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)