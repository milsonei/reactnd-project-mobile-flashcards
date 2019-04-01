import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import {
    Container,
    Header,
    Left,
    Right,
    Body,
    Content,
    Button,
    Icon,
    Title,
    Badge,
    Footer,
    FooterTab,
    Text
} from 'native-base'
import TopStatusBar  from './TopStatusBar'
import colors from '../utils/colors'

class MainContainer extends Component{
    currentTab = () => this.props.currentScene.toLowerCase()
    goHome = () => {       
        if (this.currentTab() === 'home') return
        Actions.pop()
    }
    goNewDeck = () => {
        if (this.currentTab() === 'newdeck') return
        Actions.NewDeck()
    }
    render() {
        const { footer, header, currentScene, title } = this.props
        const currentTab = currentScene.toLowerCase()
        const style = this.props.style || {}
        
        return (
            <Container>
                <TopStatusBar backgroundColor={colors.purple} barStyle='light-content' />
                {header
                    && (<Header>
                        <Left>
                            <Button transparent onPress={() => Actions.pop()}>                    
                            <Icon name='arrow-back' />           
                        </Button>
                        </Left>
                        <Body>
                            <Title>{title}</Title>
                        </Body>         
                    </Header>)}
                <Content contentContainerStyle={{flex: 1}} style={{ padding: 20,...style }}>  
                    {this.props.children}
                </Content>
                {footer && (<Footer>
                    <FooterTab>
                        <Button active={currentTab === 'home'}
                                badge
                                vertical
                                onPress={() => this.goHome()}>
                            <Badge><Text>1</Text></Badge>
                            <Icon name="apps" />
                            <Text>Decks</Text>
                        </Button>
                        <Button
                            active={currentTab === 'newdeck'}
                            vertical
                            onPress={() => this.goNewDeck()}>
                            <Icon name="add-circle"/>
                            <Text>New Deck</Text>
                        </Button>
                    </FooterTab>
                </Footer>)}
          </Container>
        )
    }
}

const mapStateToProps = ({ flux }) => {
    const { currentScene } = flux  
    return {
      currentScene
    }
};
  
export default connect(mapStateToProps)(MainContainer)