import storage from "../utils/MyStorage";

export const ADD_CORRECT = "ADD_CORRECT"
export const ADD_INCORRECT = "ADD_INCORRECT"
export const RESTART_QUIZ = "RESTART_QUIZ"
/**
 * Action to indicate that answer is correct
 * @param {string} deck Name of deck
 */
export function addCorrect(deck){    
    return {
        type: ADD_CORRECT,
        payload: { deck }
    }
}

/**
 * Action to indicate that answer is incorrect
 * @param {string} deck Name of deck
 */
export function addIncorrect(deck){    
    return {
        type: ADD_INCORRECT,
        payload: { deck }
    }
}

/**
 * Action to restart quiz
 */
export function restartQuiz(){    
    return {
        type: RESTART_QUIZ
    }
}