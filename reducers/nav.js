import AppNavigator from "../components/AppNavigator";
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
/**
 * Reducer responsible for the management of the next scene
 * @param {any} state 
 * @param {any} action 
 */
const nav = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
};
  
export default nav