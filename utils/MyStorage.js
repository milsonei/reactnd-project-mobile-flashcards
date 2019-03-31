import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = "mobile-flashcards"
/**
 * Class wrapper to access and manage AsyncStorage
 */
class MyStorage{
    /**
     * Get all decks from AsyncStorage
     */
    async getDecks() {
        return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
            .then((results) => {
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
        return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
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
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
        })
    }
}

const storage = new MyStorage()

export default storage;