import {
    SET_ERROR, CLEAR_ERROR
} from '../actions/error'
export default function error(state = null, { type, payload }) {
    switch (type) {        
        case SET_ERROR:                        
            return {
                title: payload.title,
                message: payload.message
            }
        case CLEAR_ERROR:                        
            return null           
        default:
            return state
    }
}