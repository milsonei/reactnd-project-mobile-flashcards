import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux'
import {
    Container
} from 'native-base'

import TopStatusBar  from './TopStatusBar'
import ContainerContent from './ContainerContent'
import ContainerHeader from './ContainerHeader'
import ContainerFooter  from './ContainerFooter'
import PropTypes from 'prop-types'
/**
 * Component that renders NativeBase frame component called Container
 */
class MainContainer extends Component{
    static propTypes = {
        children: PropTypes.any,
        footer: PropTypes.bool,
        header: PropTypes.bool,
        currentScene: PropTypes.string,
        title: PropTypes.string,
        scrollbar: PropTypes.bool,
        centerContentVertically: PropTypes.bool,
        onAddDeck: PropTypes.func.isRequired,
        onGoHome: PropTypes.func.isRequired,
        onGoBack: PropTypes.func.isRequired
    }
    
    handleGoHome = () => this.props.onGoHome()

    handleAddDeck = () => this.props.onAddDeck()

    handleGoBack = () => this.props.onGoBack()

    render() {
        const { children,
               footer,
               header,
               currentScene,
               title,
               scrollbar,
               centerContentVertically } = this.props
        const currentTab = currentScene.toLowerCase()
        const style = this.props.style || {}
        return (
            <Container>
                <TopStatusBar/>
                {header && (<ContainerHeader title={title} onGoBack={() => this.handleGoBack()} />)}
                <ContainerContent centerContentVertically={centerContentVertically}
                                  scrollbar={scrollbar}
                                  style={{ ...style }}>
                    {children}
                </ContainerContent>               
                {footer && (<ContainerFooter currentTab={currentTab}
                                             onGoHome={() => this.handleGoHome()}
                                             onGoAddDeck={() => this.handleAddDeck()} />)}
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

const mapDispatchToProps = (_, props) => {
    const { currentScene } = props
    return {   
        onGoBack: () => Actions.pop(),
        onGoHome : () => {       
            if (currentScene === 'home') return
            Actions.pop()
        },
        onAddDeck : () => {
            if (currentScene === 'newdeck') return
            Actions.NewDeck()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)