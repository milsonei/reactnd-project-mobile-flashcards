import StackViewStyleInterpolator from 'react-navigation-stack';
import { Platform } from 'react-native'
/**
 * Transition config for React Native Router Flux Scene
 */
const myTransitionSpec = ({
    duration: 400
});

const replaceBottomScene = false
const centerToCorners = false
const screenInterpolatorAndroid = StackViewStyleInterpolator.forVertical
const screenInterpolatorIos = sceneProps => {
    const { layout, position, scene } = sceneProps;
    const { index } = scene;
    const width = layout.initWidth;

    //right to left by replacing bottom scene
    if (replaceBottomScene) {
        return {
            transform: [{
                translateX: position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [width, 0, -width],
                }),
            }]
        };
    }

     //from center to corners
     if (centerToCorners) {
        const inputRange = [index - 1, index, index + 1];
        const opacity = position.interpolate({
            inputRange,
            outputRange: [0.8, 1, 1],
        });

        const scaleY = position.interpolate({
            inputRange,
            outputRange: ([0.8, 1, 1]),
        });

        return {
            opacity,
            transform: [
                { scaleY }
            ]
        };
    }

    const inputRange = [index - 1, index, index + 1];

    const opacity = position.interpolate({
        inputRange,
        outputRange: ([0, 1, 0]),
    });

    const translateX = position.interpolate({
        inputRange,
        outputRange: ([width, 0, 0]),
    });

    return {
        opacity,
        transform: [
            { translateX }
        ],
    };

   
}

let config = {}

if (Platform.OS === 'ios') {   
    config.screenInterpolator = screenInterpolatorIos
} else {
    config.screenInterpolator = screenInterpolatorAndroid
}

config.transitionSpec = myTransitionSpec

const transitionConfig = () => (config);

export default transitionConfig