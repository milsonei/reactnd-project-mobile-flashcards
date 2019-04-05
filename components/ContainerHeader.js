
                    
import React from 'react'
import {
    Body,
    Header,
    Left,
    Button,
    Icon,
    Title
} from 'native-base'
import PropTypes from 'prop-types'
/**
 * Component that renders the header inside container from Native Base
 * @param {any} props 
 */
const ContainerHeader = (props) => {
    const { title, onGoBack } = props 
    return (<Header iosBarStyle={"light-content"}>
                <Left>
                    <Button transparent onPress={onGoBack}>                    
                    <Icon name='arrow-back' />           
                    </Button>
                </Left>
                <Body>
                    <Title>{title}</Title>
                </Body>
            </Header>)
}

ContainerHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onGoBack: PropTypes.func.isRequired,
}

export default ContainerHeader