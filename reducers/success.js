import {
    SET_SUCCESS, CLEAR_SUCCESS
} from '../actions/success'
/**
 * This reducer specify how the sort's state changes in response to actions sent to the store
 * @param {any} state 
 * @param {any} action 
 */
export default function success(state = false, { type }) {
    switch (type) {        
        case SET_SUCCESS:                        
            return true
        case CLEAR_SUCCESS:                        
            return false           
        default:
            return state
    }
}