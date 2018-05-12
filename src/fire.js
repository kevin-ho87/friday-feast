// @flow
// Initialize Firebase
import { firebase } from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'

const config = {
  apiKey: process.env.APP_APIKEY,
  authDomain: process.env.APP_AUTHDOMAIN,
  databaseURL: process.env.APP_DATABASEURL,
  projectId: process.env.APP_PROJECTID,
  storageBucket: process.env.APP_STORAGEBUCKET,
  messagingSenderId: process.env.APP_MESSAGINGSENDERID
}

firebase.initializeApp(config)

export default firebase
export const auth = firebase.auth()
export const isAuthenticated = () => {
  return !!auth.currentUser
}