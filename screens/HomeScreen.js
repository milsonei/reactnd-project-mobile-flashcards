import React, { Component } from 'react'
import LogoTitle from '../components/LogoTitle'
import { Actions } from 'react-native-router-flux'
import { Button, Icon, Text } from 'native-base'
import { Deck } from '../components/Deck'
import MainContainer from '../components/MainContainer'
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import { getSortCondition } from '../utils/helpers'
import { SuccessToast } from '../components/Toast'
import * as Animatable from 'react-native-animatable';
import Loading from '../components/Loading';
class HomeScreen extends Component {
  state = {
    ready: false,
    showNotification: false,
    selected:''
}
  componentWillMount() {
    this.props.receiveDecks().then(() => this.setState((state) => ({
      ...state,
      ready: true
    })))
  }
  /**
   * Show selected deck
   */
  showSelecteDeck() {
    this.props.showDeck(this.state.selected)
    this.clearSelect()
  }
  /**
   * selects deck for animation
   * @param {string} title Title of deck
   */
  select(title) {
    this.setState((state) => ({
      ...state,
      selected: title
    }))
  }
  /**
   * Clear selected deck
   */
  clearSelect() {
    this.setState((state) => ({
      ...state,
      selected: ''
    }))
  }
  render() {
    const { ready } = this.state
    if (ready === false){
      return (
        <Loading/>
      )
    }
   
    const leftButton = (<Button transparent><LogoTitle /></Button>);
    const rightButton = (<Button transparent onPress={() => this.props.newDeck()}>
                          <Icon type="Ionicons" name="add-circle" />
                          <Text>New</Text>
    </Button>);   
    const { decks } = this.props
    const { selected } = this.state
      return (
        <MainContainer footer title="Decks" leftButton={leftButton} rightButton={rightButton}>
          {Object.keys(decks).sort((a,b) => getSortCondition(decks[a]['title'],decks[b]['title'], 'asc')).map((key, index) => {
            const item = decks[key]
            const title = item.title
            const body = `${item.questions.length} cards`  
            const animateDeck = selected === key  
            const deck = (<Deck key={`deck-${(index + 1)}`}
                  title={title}
                  body={body}
                  onPress={() => this.select(title)} />)
            return (
              animateDeck === true ?
                (<Animatable.View key={`animation-${(index + 1)}`}
                  animation="swing"
                  iterationCount={1}
                  duration={700}
                  direction="normal"
                  onAnimationEnd={() => this.showSelecteDeck()}>
               {deck}
              </Animatable.View>)
              : deck)

          })}
          <SuccessToast duration={0} visible={this.state.showNotification} message="Please, you need study today!" />
        </MainContainer>
    )
  }
}

const mapStateToProps = ({ decks, flux }) => {  
  const { data } = flux
  return {
    decks,
    data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveDecks: async() => {
      return handleReceiveDecks(dispatch)
    },
    newDeck: () => Actions.NewDeck(),
    showDeck: (title) => Actions.DeckView({ title })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)