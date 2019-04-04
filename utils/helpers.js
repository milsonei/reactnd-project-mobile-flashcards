import { Alert } from 'react-native'
import { Toast } from 'native-base';

  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

/**
* Get sort condition to sort function
* @param {any} firstData First data to compare
* @param {any} secondData Second data to compare
* @param {string} direction asc or desc
* @return {number} 1 to ascending sort, -1 to descending sort and 0 to none
*/
export function getSortCondition (firstData, secondData, direction) {    
   const sortKey = direction === "asc" ? 1 : -1   
   if (firstData > secondData) {
       return 1*sortKey;
     }
     if (firstData < secondData) {
       return -1*sortKey;
     }
     // a must be equal to b
     return 0;
}
/**
 * Show alert dialog
 * @param {string} title Title
 * @param {string} message Message
 */
export function showAlert(title, message) {
  Alert.alert(
    title,
    message,
    [         
      {text: 'OK'},
    ],
    {cancelable: true},
  );
}

/**
 * Use NativeBase Toast to display quick error messages
 * @param {string} message error message
 * @param {number} duration Milliseconds after which Toast disappears. Default 5000 or 5 seconds
 */
export function showErrorToast(message, duration = 5000) {
  Toast.show({
    text: message,
    type: 'danger',
    buttonText: 'Ok',
    position: 'bottom',
    duration
  })
}

/**
 * Use NativeBase Toast to display quick success messages
 * @param {string} message success message
 * @param {number} duration Milliseconds after which Toast disappears. Default 5000 or 5 seconds
 */
export function showSuccessToast(message, duration = 5000) {
  Toast.show({
    text: message,
    type: 'success',
    buttonText: 'Ok',
    position: 'bottom',
    duration
  })
}
/**
 * Get current date in yyyy-mm-dd format
 */
export function getCurrentDate() {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
}
/**
 * Use NativeBase Toast to display quick warning messages
 * @param {string} message warning message
 * @param {number} duration Milliseconds after which Toast disappears. Default 5000 or 5 seconds
 */
export function showWarningToast(message, duration = 5000) {
  Toast.show({
    text: message,
    type: 'warning',
    buttonText: 'Ok',
    position: 'bottom',
    duration
  })
}

export function getInitialData() {
  return {
    React: {
      title: 'React',
      lastQuiz: {
        date: '',
        correct: 0,
        incorrect: 0,
      },
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      lastQuiz: {
        date: '',
        correct: 0,
        incorrect: 0,
      },
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}