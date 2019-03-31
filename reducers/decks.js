import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_CARD
} from '../actions'

const decks = (state = {}, { type, payload }) => {
    switch (type) {
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