import React from 'react'
import {
    Content
} from 'native-base'
import { View } from 'react-native'
import FullBody from './FullBody'
import PropTypes from 'prop-types'
/**
 * Component that renders a content from Native Base Frame Component called Container
 * @param {any} props 
 */
const ContainerContent = (props) => {
    const { scrollbar, children, centerContentVertically } = props
    const style = props.style || {}
    const childrenContainer = centerContentVertically
        ? (<FullBody>{children}</FullBody>)
        : (children)
    return (
        scrollbar
            ? (<Content style={{...style}}>  
                    <View style={{ padding: 20 }}>
                        {childrenContainer}
                    </View>
                </Content>)
            :  (<Content contentContainerStyle={{flex : 1}} style={{padding: 20,...style}}>
                    {childrenContainer}
                </Content>))
}

ContainerContent.propTypes = {
    scrollbar: PropTypes.bool,
    children: PropTypes.any,
    centerContentVertically: PropTypes.bool,
    style: PropTypes.object   
}

export default ContainerContent