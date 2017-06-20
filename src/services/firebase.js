import Firebase from 'firebase'

// var config = {
//   apiKey: 'AIzaSyDmdLJBvDEe8ZaGWZPHUILhlhCWspNzemM',
//   authDomain: 'pongsatt-notification.firebaseapp.com',
//   databaseURL: 'https://pongsatt-notification.firebaseio.com',
//   projectId: 'pongsatt-notification',
//   storageBucket: 'pongsatt-notification.appspot.com',
//   messagingSenderId: '820316361560'
// }
var config = {
  apiKey: 'AIzaSyApAt_H0iy3l1NyGX38uwQhidX8_bL6zRw',
  authDomain: 'route64-cecb6.firebaseapp.com',
  databaseURL: 'https://route64-cecb6.firebaseio.com',
  projectId: 'route64-cecb6',
  storageBucket: 'route64-cecb6.appspot.com',
  messagingSenderId: '359893308707'
}
const firebase = Firebase.initializeApp(config)

console.log('Firebase initialized')

export default firebase
