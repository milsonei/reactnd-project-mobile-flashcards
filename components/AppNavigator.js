import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import HomeScreen from '../screens/HomeScreen'
import NewDeckScreen from '../screens/NewDeckScreen'
import DeckViewScreen from '../screens/DeckViewScreen'
import NewCardScreen from '../screens/NewCardScreen'
import QuizViewScreen from '../screens/QuizViewScreen'
import transitionConfig from './TransitionConfig'
/**
 * Pass Scene to create your app navigator and the Props the Router should receive. 
 * It is alternative router creation method mostly used for Redux integration
 */
const AppNavigator = Actions.create(
    <Scene key="root" hideNavBar ={true} transitionConfig={transitionConfig}>
        <Scene key="Home" component={HomeScreen} initial/>
        <Scene key="NewDeck" component={NewDeckScreen}/>
        <Scene key="DeckView" component={DeckViewScreen}/>
        <Scene key="NewCard" component={NewCardScreen}/>
        <Scene key="QuizView" component={QuizViewScreen}/>
    </Scene>
)

export default AppNavigator