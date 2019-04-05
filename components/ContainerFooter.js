import React from 'react'
import {
    Button,
    Icon,
    Footer,
    FooterTab,
    Text
} from 'native-base'
import PropTypes from 'prop-types'
/**
 * Component that renders the footer inside container from Native Base
 * @param {any} props 
 */
const ContainerFooter = (props) => {
    const { onGoHome, onGoAddDeck, currentTab } = props
    return (<Footer>
                <FooterTab>
                    <Button active={currentTab === 'home'}                                
                            vertical
                            onPress={onGoHome}>            
                        <Icon name="apps" />
                        <Text>Decks</Text>
                    </Button>
                    <Button
                        active={currentTab === 'newdeck'}
                        vertical
                        onPress={onGoAddDeck}>
                        <Icon name="add-circle"/>
                        <Text>New Deck</Text>
                    </Button>
                </FooterTab>
            </Footer>)
}

ContainerFooter.propTypes = {
    currentTab: PropTypes.string.isRequired,    
    onGoHome: PropTypes.func.isRequired,
    onGoAddDeck: PropTypes.func.isRequired
}

export default ContainerFooter