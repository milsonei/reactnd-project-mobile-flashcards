import { Alert, StyleSheet, AsyncStorage } from 'react-native'
import { Toast } from 'native-base';
import { Notifications, Permissions, Constants } from 'expo'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'
export function isBetween (num, x, y) {
    if (num >= x && num <= y) {
      return true
    }
  
    return false
  }
  
  export function calculateDirection (heading) {
    let direction = ''
    
    if (isBetween(heading, 0, 22.5)) {
      direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
      direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
      direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
      direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
      direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
      direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
      direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
      direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
      direction = 'North'
    } else {
      direction = 'Calculating'
    }
  
    return direction
  }
  
  export function timeToString (time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
  }

  const styles = StyleSheet.create({
    iconContainer: {
      padding: 5,
      borderRadius: 8,
      width: 50,
      height:50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:20
    }
  })


export function clearLocalNotification(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync)
}
  
function createNotification(){
  const localnotification = {
    title: "Log your stats",
    body: "👋 don't forget to log your stats for today",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      stick: false,
      vibrate: true
    },
    data: {

    },
  }

  localnotification.data.title = localnotification.title;
  localnotification.data.body = localnotification.body;

  return localnotification
}
export function setLocalNotification() {
  if (!Constants.isDevice) {
    console.warn('Device only!')
    return
  }
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync().then(() => {
            let tomorrow = new Date()
            console.log('Date:', tomorrow)
            tomorrow.setDate(tomorrow.getDate())
            tomorrow.setHours(tomorrow.getHours())
            tomorrow.setMinutes(tomorrow.getMinutes())
            tomorrow.setSeconds(tomorrow.getSeconds() + 10)
           
            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              //repeat: 'minute'
            }).then((id) => {
              console.log('id:',id)
              console.log('Date:', tomorrow)
            })
  
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          })
        }
      })
    }
  })
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