import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCOd8pzrG1ub_7BuKPUfxSL1PhL3CEdq0g',
  authDomain: 'shop-clothes-app.firebaseapp.com',
  databaseURL: 'https://shop-clothes-app.firebaseio.com',
  projectId: 'shop-clothes-app',
  storageBucket: 'shop-clothes-app.appspot.com',
  messagingSenderId: '246739819324',
  appId: '1:246739819324:web:8de2f2eaaa96beb6609c39',
}

firebase.initializeApp(config)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
