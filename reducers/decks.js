import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_CARD,
    SET_COMPLETED_QUIZ
} from '../actions'
/**
 * Reducer responsible for the management of the decks and cards
 * @param {any} state 
 * @param {any} action 
 */
const decks = (state = {}, { type, payload }) => {
    switch (type) {
        case SET_COMPLETED_QUIZ:
        const { quiz } = payload
        return {
            ...state,
            [quiz.deck]: {
                ...state[quiz.deck],
                lastQuiz: {
                    date: quiz.date,
                    correct: quiz.correct,
                    incorrect: quiz.incorrect
                }
                
            }
        }
        case RECEIVE_DECKS:
            return {
                ...state,
                ...payload.decks
            }
        case ADD_DECK:           
            return {
                ...state,
                [payload.deck.title]: {
                    ...payload.deck
                }
                
            }
        case ADD_CARD:
            return {
                ...state,
                [payload.key]: {
                    ...state[payload.key],
                    questions: [
                        ...state[payload.key].questions,
                        ...[payload.card]
                    ]
                    
                }
            }
        default:
            return state
    }
}

export default decks