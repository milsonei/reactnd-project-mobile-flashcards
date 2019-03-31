import {
    SET_SUCCESS, CLEAR_SUCCESS
} from '../actions/success'
/**
 * This reducer specify how the sort's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function success(state = null, { type }) {
    switch (type) {        
        case SET_SUCCESS:                        
            return true
        case CLEAR_SUCCESS:                        
            return null           
        default:
            return state
    }
}