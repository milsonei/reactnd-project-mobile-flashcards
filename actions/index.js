import storage from '../utils/MyStorage';
import { setError } from './error';
import { setSuccess } from './success';
import { getCurrentDate } from '../utils/helpers';
import { restartQuiz } from './quiz';
import notificator from '../utils/MyNotificator';
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const SET_COMPLETED_QUIZ = 'SET_COMPLETED_QUIZ'
/**
 * Receive a list of decks in normalized format
 * @param {any} decks list of decks as object
 */
export function receiveDecks(decks){
    return {
        type: RECEIVE_DECKS,
        payload: {
            decks
        }
    }
}
/**
 * Add a deck to store
 * @param {string} title deck title
 */
export function addDeck(title){
    return {
        type: ADD_DECK,
        payload: {
            deck: {
                title,
                lastQuiz: {
                    date: '',
                    correct: 0,
                    incorrect: 0
                },
                questions: []
            }
        }
    }
}

/**
 * Set completed quiz for a specific deck
 * @param {string} deck deck title
 * @param {number} correct number of correct questions
 * @param {number} incorrect number of incorrect questions
 */
export function setCompletedQuiz(deck, correct, incorrect){
    return {
        type: SET_COMPLETED_QUIZ,
        payload: {
            quiz: {
                deck,
                date: getCurrentDate(),
                correct,
                incorrect
            }
        }
    }
}

/**
 * Add a card to deck
 * @param {string} key Deck title
 * @param {any} card card object
 */
export function addCardToDeck(key, card){
    return {
        type: ADD_CARD,
        payload: {
            key,
            card
        }
    }
}

/**
 * Handle action add deck
 * @param {string} title deck title
 * @param {function} dispatch dispatch reference
 */
export async function handleAddDeck(title, dispatch) {  
    return storage.hasDeck(title).then(async (ok) => {
        if (ok) {
            dispatch(setError('Warning', `The deck ${title} already exists. Try another.`))
        } else {
            return storage.saveDeckTitle(title).then(() => {        
                dispatch(addDeck(title))
                dispatch(restartQuiz())
                dispatch(setSuccess())
            }).catch(() => {
                dispatch(setError('Error', 'There was an error inserting the deck. Try again.'))
            })
        }
    })
}

/**
 * Handle action receive decks
 * @param {function} dispatch dispatch reference
 */
export async function handleReceiveDecks(dispatch) {
    try {
        const decks = await storage.getDecks()
        dispatch(receiveDecks(decks))        
    } catch {
        dispatch(setError('Error', 'Error on receive decks. Try again.'))
    }    
}
/**
 * Handle action add card to deck
 * @param {string} title deck title
 * @param {function} dispatch dispatch reference
 */
export async function handleAddCardToDeck(title, card, dispatch) {    
    try {
        await storage.addCardToDeck(title, card)
        dispatch(addCardToDeck(title, card))
        dispatch(restartQuiz())
        dispatch(setSuccess())
    } catch (ex) {
        dispatch(setError('Error', 'Error on add cards. Try again.'))
    }
}

export async function handleSetCompletedQuiz(deck, correct, incorrect, dispatch) {   
    try {
        await storage.setLastCompletedQuiz(deck, correct, incorrect)
        notificator.clearAndSetNotification()
        dispatch(setCompletedQuiz(deck, correct, incorrect))
    } catch (ex) {
        dispatch(setError('Error', 'Error on setting completed quiz. Try again.'))
    }
}