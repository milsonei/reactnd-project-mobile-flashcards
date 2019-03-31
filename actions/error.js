export const SET_ERROR = "SET_ERROR"
export const CLEAR_ERROR = "CLEAR_ERROR"
/**
 * Action to indicate error of previous action.
 * @param {string} title error title
 * @param {string} message error message
 */
export function setError(title, message){    
    return {
        type: SET_ERROR,
        payload: {
            title,
            message
        }
    }
}

/**
 * Clear error information
 */
export function clearError(){    
    return {
        type: CLEAR_ERROR
    }
}