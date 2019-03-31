import React, { Component } from 'react'
import LogoTitle from '../components/LogoTitle'
import { Actions } from 'react-native-router-flux'
import { Button, Icon, Text } from 'native-base'
import { Deck } from '../components/Deck'
import MainContainer from '../components/MainContainer'
import { handleReceiveDecks } from '../actions';
import { connect } from 'react-redux';
import { AppLoading } from "expo"
import { getSortCondition } from '../utils/helpers'
import { SuccessToast } from '../components/Toast'
class Home extends Component {
  state = {
    ready: false,
    showNotification: false
}
  componentWillMount() {
    this.props.receiveDecks().then(() => this.setState(() => ({
      ready: true
    })))
  }

  render() {
    const { ready } = this.state
    if (ready === false){
        return <AppLoading/>
    }
   
    const leftButton = (<Button transparent><LogoTitle /></Button>);
    const rightButton = (<Button transparent onPress={() => this.props.newDeck()}>
                          <Icon type="Ionicons" name="add-circle" />
                          <Text>New</Text>
                        </Button>);
    const { decks } = this.props
      return (
        <MainContainer title="Decks" leftButton={leftButton} rightButton={rightButton}>
          {Object.keys(decks).sort((a,b) => getSortCondition(decks[a]['title'],decks[b]['title'], 'asc')).map((key, index) => {
            const item = decks[key]
            const title = item.title
            const body = `${item.questions.length} cards`            
            return (
            <Deck key={`deck-${(index + 1)}`}
              title={title}
              body={body}
              onPress={() => this.props.showDeck(title)} />
            )
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)