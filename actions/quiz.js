export const ADD_CORRECT = "ADD_CORRECT"
export const ADD_INCORRECT = "ADD_INCORRECT"
export const RESTART_QUIZ = "RESTART_QUIZ"
/**
 * Action to indicate that answer is correct
 * @param {string} deck Name of deck
 * @param {number} current Current index of question
 */
export function addCorrect(deck, current){    
    return {
        type: ADD_CORRECT,
        payload: {
                    deck,
                    current}
    }
}

/**
 * Action to indicate that answer is incorrect
 * @param {string} deck Name of deck
 * @param {number} current Current index of question
 */
export function addIncorrect(deck, current){    
    return {
        type: ADD_INCORRECT,
        payload: {
            deck,
            current}
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