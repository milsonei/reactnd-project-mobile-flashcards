import React from 'react'
import ProgressCircle from 'react-native-progress-circle' 
import { Text } from 'native-base'
/**
 * Component that renders a circle of progress with percentage result
 * @param {any} props 
 */
function QuizPercentageInfo(props) {
    const { correct, numQuestions, size } = props
    const width = size === 'small' ? 20 : 50
    const fontSize = size === 'small' ? 8 : 20
    const total = Math.ceil(correct*100.00/numQuestions)
    return (
        <ProgressCircle    
        outerCircleStyle={{marginLeft: "auto", marginRight: "auto"}}         
        percent={total}
        radius={width}
        borderWidth={8}
        color="#3399FF"
        shadowColor="#999"
        bgColor="#fff"
    >
        <Text style={{ fontSize: fontSize }}>{total}%</Text>
    </ProgressCircle>
    )
}

export default QuizPercentageInfo