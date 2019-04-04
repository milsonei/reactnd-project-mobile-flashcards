import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'
class MyNotificator{
  /**
   * Clear local notification
   */
  clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  /**
   * Create a study notification
   */
  createNotification () {
    return {
      title: 'Learn by Flashcards!',
      body: "👋 don't forget to review your flashcards today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
}
  /**
   * Get local notification stored in AsyncStorage
   */
  getLocalNotification() {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)     
  }
  /**
   * Clears the existing notification and schedules new notification for the next day
   */
  async clearAndSetNotification() {
    return this.clearLocalNotification().then(() => {
      return this.setLocalNotification()
    })
  }
  /**
   * Generates the next notification date
   * @param {bool} test generate data for test
   */
  generateNextDate = (test) => {    
    if (test) {
    /** Next 5 seconds */
      let sendAfterFiveSeconds = Date.now();
      sendAfterFiveSeconds += 5000;
      return sendAfterFiveSeconds
    } 
    /** Next day */
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(19)
    tomorrow.setMinutes(0)
    return tomorrow
    
  }
   /**
   * Get the content of the notification or 
   * get the default notification if the original content is empty.
   * @param {any} notification Original notification stored
   */
  getNotificationContent = (notification) => {
    if (notification) {
      if (notification.origin !== 'received') {
        return null
      } 

      if ('title' in notification) {
        return notification
      }

      if (notification.data){
        if ('title' in notification.data) {
          return notification.data
        } else {
          /**
           * If for some reason the date field is empty, the default notification will be shown
           */
          return this.createNotification()
        }
      }
    }
    return null
  }
  /**
   * Listen for notifications
   * @param handleNotification external function to show message
   */
  listenForNotifications = (handleNotification) => {
    if (handleNotification) {
      Notifications.addListener(notification => {
        const notif = this.getNotificationContent(notification)
        if (notif) {
          handleNotification(notif.title, notif.body);
        }
      });
    }
  };

  async getNotificationPermission() {
    const { status } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    if (status !== 'granted') {
      await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
  }
  /**
   * Set up a study notification for the next day
   * @param {function} test To test expire in 5 minutes
   */
    setLocalNotification (test) {
    return AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {                
                Notifications.cancelAllScheduledNotificationsAsync()  
                let tomorrow = this.generateNextDate(test)
                let notification = this.createNotification()
                Notifications.scheduleLocalNotificationAsync(
                  notification,
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                );
                
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  } 
}

const notificator = new MyNotificator()

export default notificator;