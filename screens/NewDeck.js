import React, { Component } from 'react'
import { Form, Item, Button, Input, Text } from 'native-base'
import MainContainer from '../components/MainContainer'
import { handleAddDeck } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { clearSuccess } from '../actions/success';
import { clearError } from '../actions/error';
import Loading from '../components/Loading'
import { showAlert } from '../utils/helpers';
class NewDeck extends Component{
  state = {
    title: '',
    sending: false
  }
  componentWillReceiveProps(nextProps) {
    const { success, error, goBack, clearSuccess, clearError } = nextProps

    if (success) {
      goBack()
      clearSuccess()  
    }

    if (error) {  
      showAlert( error.title, error.message)
      clearError()
      this.stopLoading()
    }
 }
  onChangeText(text) {
    this.setState({
      title: text
    });
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
  handleSubmit() {
    const { title } = this.state
    const { addDeck } = this.props
    this.startLoading()
    addDeck(title)
  }
 
  render() {
    const { title, sending } = this.state
    if (sending) {
      return (
        <Loading/>
      )
    }
        const empty = title === ''
        return (
            <MainContainer title="Add Deck">
              <Form>
                  <Item>
                    <Text style={{ textAlign:"center", marginTop: 10, marginBottom: 30, marginLeft:"auto", marginRight:"auto", fontSize:30}}>What is the title of the new deck?</Text>
                    </Item>
                  <Item regular>
                      <Input
                        placeholder="Deck Title"
                        value={title}
                        onChangeText={this.onChangeText.bind(this)} />
                  </Item>
              </Form> 
            <Button style={{ marginTop: 30, marginLeft: "auto", marginRight: "auto" }}
                    primary
                    disabled={empty}
                    onPress={() => this.handleSubmit()}>
                <Text>Submit</Text>
              </Button>
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
    addDeck: (title) => { 
      handleAddDeck(title, dispatch)
    },
    clearSuccess: () => dispatch(clearSuccess()),
    clearError: () => dispatch(clearError()),
    goBack: () => Actions.pop()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)