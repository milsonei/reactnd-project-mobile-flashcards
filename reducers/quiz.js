import {
    ADD_CORRECT, ADD_INCORRECT, RESTART_QUIZ
} from '../actions/quiz'
/**
 * Reducer responsible for the management of the quiz
 * @param {any} state 
 * @param {any} action 
 */
export default function quiz(state = { deck: '', correct: 0, incorrect: 0, restarted: false }, { type, payload }) {
    switch (type) {        
        case ADD_CORRECT:  
            let correct = state.correct
            if (state.deck && state.deck !== payload.deck) {
                correct = 0
            }    
            return {                                
                ...state,
                deck: payload.deck,
                correct: correct + 1,
            }
        case ADD_INCORRECT:  
            let incorrect = state.incorrect
            if (state.deck && state.deck !== payload.deck) {
                incorrect = 0
            }        
            return {
                ...state,
                deck: payload.deck,
                incorrect: incorrect + 1
            }
        case RESTART_QUIZ: 
            return {                
                deck:'',
                correct: 0,
                incorrect: 0,
                restarted: true
            }           
        default:
            return state
    }
}