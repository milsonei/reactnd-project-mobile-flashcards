import React, { Component } from 'react'
import QuizCard from '../components/QuizCard'
import MainContainer from '../components/MainContainer'
import { connect } from 'react-redux'
class QuizView extends Component{  
    render(){
        return (
          <MainContainer style={{paddingTop:"45%"}} title="Quiz">
            <QuizCard/>
          </MainContainer>
        )
    }
}

const mapStateToProps = ({ flux }) => ({ data } = flux);

const mapDispatchToProps = (dispatch) => {
  return {
    addDeck: (title) => {
     
      dispatch(addDeck(title))
    },
      goBack: () => Actions.pop()
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizView)