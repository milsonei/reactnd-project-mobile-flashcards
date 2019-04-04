import { ActionConst } from 'react-native-router-flux'

const INITIAL_STATE = { data: null, currentScene: 'home' }
const log = process.env.NODE_ENV === 'development'
/**
 * Reducer responsible for the management of the update scenes
 * @param {any} state 
 * @param {any} action 
 */
const flux = (state = INITIAL_STATE, { type, payload, routeName }) => {
  switch (type) {
    case ActionConst.FOCUS:
      if (log) {
        console.log('FOCUS event fired with scene parameter: ', routeName);
      }
      return { ...state, currentScene: routeName };
    case 'data':
      return { ...state, data: payload };

    default:
      return state;
  }
}

export default flux