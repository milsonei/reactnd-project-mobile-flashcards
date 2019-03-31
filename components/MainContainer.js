import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Container, Header, Left, Right, Body, Content, Button, Icon, Title } from 'native-base'
import TopStatusBar  from './TopStatusBar'
import colors from '../utils/colors'
export default class MainContainer extends Component{  
    render() {
        const leftButton = this.props.leftButton ||
                         (<Button transparent onPress={() => Actions.pop()}>                    
                            <Icon name='arrow-back' />
            </Button>)
        const style = this.props.style || {}
        const rightButton = this.props.rightButton
        return (
            <Container>
                <TopStatusBar backgroundColor={colors.purple} barStyle='light-content'/>
                <Header>
                    <Left>
                       {leftButton}
                    </Left>
                    <Body>
                        <Title>{this.props.title}</Title>
                    </Body> 
                    {rightButton && (<Right>{rightButton}</Right>)}
                </Header>
                <Content style={{ padding: 20,...style }}>  
                    {this.props.children}
                </Content>
          </Container>
        )
    }
}