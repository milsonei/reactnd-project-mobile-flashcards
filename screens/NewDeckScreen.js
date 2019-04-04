import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Card, CardItem, Body, Form, Item, Button, Input, Text } from 'native-base'
import MainContainer from '../components/MainContainer'
import { handleAddDeck } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { clearSuccess } from '../actions/success'
import { clearError } from '../actions/error'
import Loading from '../components/Loading'
import { showAlert } from '../utils/helpers'
import colors from '../utils/colors';
import PropTypes from 'prop-types'
import { commomStyles } from '../utils/styles';

/**
 * Component that renders the screen responsible for adding a card to a deck
 */
class NewDeckScreen extends Component{
  static propTypes = {
    success: PropTypes.bool.isRequired,
    error: PropTypes.object,
    onAddDeck: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
    onClearSuccess: PropTypes.func.isRequired,
    onClearError: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    sending: false
  }
 
  handleChangeTitle = (text) => {
    this.setState({
      title: text
    });
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

  handleSubmit = () => {
    const { title } = this.state
    const { onAddDeck } = this.props
    this.startLoading()
    onAddDeck(title)
  }
 
  componentWillReceiveProps(nextProps) {
    const { success, error, onGoBack, onClearSuccess, onClearError } = nextProps

    if (success) {
      onGoBack()
      onClearSuccess()  
    }

    if (error) {  
      showAlert( error.title, error.message)
      onClearError()
      this.stopLoading()
    }
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
          <MainContainer centerContentVertically footer title="Add Deck">
            <Card style={styles.centerVertically}>
                <CardItem header bordered>
                  <Text style={styles.cardHeaderText}>What is the title of the new deck?</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Form style={styles.maxWidth}>
                      <Item regular style={styles.centerHorizontally}>
                          <Input                        
                            placeholder="Type title here"
                            value={title}
                            onChangeText={this.handleChangeTitle.bind(this)} />
                      </Item>  
                    </Form> 
                  </Body>
                </CardItem>    
                <CardItem footer bordered>
                <Button style={styles.centerAll}
                    primary
                    disabled={empty}
                    onPress={() => this.handleSubmit()}>
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
    onAddDeck: (title) => { 
      handleAddDeck(title, dispatch)
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
  centerHorizontally: {
    ...commomStyles.centerHorizontally
  },
  centerAll: {
    ...commomStyles.centerHorizontally,
    ...commomStyles.centerVertically
  }, 
  buttonText: {
    ...commomStyles.centerText,
    ...commomStyles.centerHorizontally
  },
  cardHeaderText: {    
    ...commomStyles.centerText,
    ...commomStyles.centerHorizontally,
    ...commomStyles.centerVertically,
    color: colors.purple,
    fontSize: 30
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckScreen)