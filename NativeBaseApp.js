import React from 'react'
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import decks from './reducers/decks'
import nav from './reducers/nav'
import flux from './reducers/flux'
import success from './reducers/success'
import error from './reducers/error'
import quiz from './reducers/quiz'
import AppNavigator from './components/AppNavigator'
/** react-native-router-flux is a different API over react-navigation. 
 * It helps users to define all the routes in one central place and navigate and 
 * communicate between different screens in an easy way 
 * */
import { Router } from 'react-native-router-flux'
/** This package allows the user to manage their React Navigation state from within Redux. */
import { createReduxContainer, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import logger from './middleware/logger';
const appReducer = combineReducers({
  nav,
  decks,
  flux,
  success,
  error,
  quiz
});
/**
 * Returns a middleware that can be applied to a Redux store.
 */
const middleware = createReactNavigationReduxMiddleware(state => state.nav);
/**
 * Returns a HOC (higher-order component) that wraps your root navigator
 */
const ReduxNavigator = createReduxContainer(AppNavigator);

const mapStateToProps = state => ({
  state: state.nav,
});

/**
 * Create a redux router with navigation state
 */
const ReduxRouter = connect(mapStateToProps)(Router);

const store = createStore(appReducer, applyMiddleware(middleware, logger));

function NativeBaseApp(){
  return (
    <Provider store={store}>
      <ReduxRouter navigator={ReduxNavigator} />
    </Provider>
  );
}

export default NativeBaseApp