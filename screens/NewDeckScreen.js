import React, { Component } from 'react'
import { Card, CardItem, Body, Grid, Form, Row, Col, Item, Button, Input, Text } from 'native-base'
import MainContainer from '../components/MainContainer'
import { handleAddDeck } from '../actions';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import { clearSuccess } from '../actions/success'
import { clearError } from '../actions/error'
import Loading from '../components/Loading'
import { showAlert } from '../utils/helpers'
import colors from '../utils/colors';
class NewDeckScreen extends Component{
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
          <MainContainer footer title="Add Deck">
            <Grid >
              <Row style={{height:"100%"}}>
                <Col>                          
                  <Card style={{marginTop: "auto", marginBottom: "auto"}}>
                      <CardItem header bordered>
                        <Text style={{ color:colors.purple, textAlign:"center", marginTop: "auto", marginBottom: "auto", marginLeft:"auto", marginRight:"auto", fontSize:30}}>What is the title of the new deck?</Text>                                      
                      </CardItem>
                      <CardItem bordered>
                        <Body>
                          <Form style={{width:"100%"}}>
                            <Item regular style={{marginTop: "auto", marginBottom: "auto"}}>
                                <Input                        
                                  placeholder="Type title here"
                                  value={title}
                                  onChangeText={this.onChangeText.bind(this)} />
                                </Item>  
                          </Form> 
                        </Body>
                      </CardItem>    
                      <CardItem footer bordered>
                         <Button style={{ marginBottom: "auto", marginTop: "auto", marginLeft: "auto", marginRight: "auto" }}
                          primary
                          disabled={empty}
                          onPress={() => this.handleSubmit()}>
                            <Text>Submit</Text>
                          </Button>
                      </CardItem>     
                    </Card> 
                  </Col>
                </Row>             
              </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckScreen)