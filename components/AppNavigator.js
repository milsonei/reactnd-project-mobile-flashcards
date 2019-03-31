import React from 'react'
import { Actions, Scene } from 'react-native-router-flux'
import Home from '../screens/Home'
import NewDeck from '../screens/NewDeck'
import DeckView from '../screens/DeckView'
import NewCard from '../screens/NewCard'
import QuizView from '../screens/QuizView'
/**
 * Pass Scene to create your app navigator and the Props the Router should receive. 
 * It is alternative router creation method mostly used for Redux integration
 */
const AppNavigator = Actions.create(
    <Scene key="root" hideNavBar={true}>
        <Scene key="Home" component={Home}/>
        <Scene key="NewDeck" component={NewDeck}/>
        <Scene key="DeckView" component={DeckView}/>
        <Scene key="NewCard" component={NewCard}/>
        <Scene key="QuizView" component={QuizView}/>
    </Scene>
)
    
export default AppNavigator