// @flow
// Initialize Firebase
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAMTNg81_tsmDd2TAA9JwxpGQMWKVbPeWY",
  authDomain: "friday-feasts.firebaseapp.com",
  databaseURL: "https://friday-feasts.firebaseio.com",
  projectId: "friday-feasts",
  storageBucket: "friday-feasts.appspot.com",
  messagingSenderId: "59209303252"
}

firebase.initializeApp(config)

export default firebase
export const auth = firebase.auth()