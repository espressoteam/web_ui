import Firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDmdLJBvDEe8ZaGWZPHUILhlhCWspNzemM',
  authDomain: 'pongsatt-notification.firebaseapp.com',
  databaseURL: 'https://pongsatt-notification.firebaseio.com',
  projectId: 'pongsatt-notification',
  storageBucket: 'pongsatt-notification.appspot.com',
  messagingSenderId: '820316361560'
}
const firebase = Firebase.initializeApp(config)

console.log('Firebase initialized')

export default firebase
