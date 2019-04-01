import {
    ADD_CORRECT, ADD_INCORRECT, RESTART_QUIZ
} from '../actions/quiz'
export default function quiz(state = { deck: '', correct: 0, incorrect: 0 }, { type, payload }) {
    switch (type) {        
        case ADD_CORRECT:                        
            return {                
                ...state,
                deck: payload.deck,
                correct: state.correct + 1
            }
        case ADD_INCORRECT:                        
            return {
                ...state,
                deck: payload.deck,
                incorrect: state.incorrect + 1
            }
        case RESTART_QUIZ:                        
            return {
                deck:'',
                correct: 0,
                incorrect: 0
            }           
        default:
            return state
    }
}