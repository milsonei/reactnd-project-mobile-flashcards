import { AsyncStorage } from 'react-native'
import { getInitialData, getCurrentDate } from './helpers';
const STORAGE_KEY = "MobileFlashcards:storage"
/**
 * Class wrapper to access and manage AsyncStorage
 */
class MyStorage{
    
    /**
     * Get all decks from AsyncStorage
     */
    async getDecks() {        
        return AsyncStorage.getItem(STORAGE_KEY)
            .then((results) => {        
                if (results === null) {
                    results = getInitialData()
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(results))
                }
                const parsedResults = JSON.parse(results)
                return parsedResults
            })
       
    }   
     /**
     * get deck from AsyncStorage associated with especific key
     * @param {string} id 
     * @returns object
     */
    async getDeck(id){
        return this.getDecks().then((results) => {
            return results[id]
        })
    }

     /**
     * check if deck exists in AsyncStorage associated with especific key
     * @param {string} id 
     * @returns object
     */
    async hasDeck(id){
        return this.getDecks().then((results) => {
            if (results[id]) {
                return true
            }
            return false
        })
    }

    /**
     * Stores entry in AsyncStorage
     * @param {string} title
     */
    saveDeckTitle(title){
        return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                lastQuiz: {
                    date: '',
                    correct: 0,
                    incorrect: 0
                },               
                questions: []
            }
        }))
    }

    /**
     * Add card into specific deck stored in AsyncStorage
     * @param {string} title Deck key
     * @param {any} card Card 
     */
    async addCardToDeck(title, card){
        return this.getDecks().then((data) => {
            const deck = data[title]
            deck.questions.push(card)
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
    }
     /**
      * Set last quiz completed for specific deck stor
      * @param {*} title Deck title
      * @param {*} correct number of correct questions
      * @param {*} incorrect number of incorrect questions
      */
    async setLastCompletedQuiz(title, correct, incorrect){
        return this.getDecks().then((data) => {
            const deck = data[title]
            deck.lastQuiz.date = getCurrentDate()
            deck.lastQuiz.correct = correct
            deck.lastQuiz.incorrect = incorrect
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
    }

     /**
     * Clear local storage
     */
  clearLocalStorage () {
    return AsyncStorage.removeItem(STORAGE_KEY)
  }
}

const storage = new MyStorage()

export default storage;