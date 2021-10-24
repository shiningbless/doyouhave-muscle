// Import the functions you need from the SDKs you need
import Vue from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import VueCompositionApi from '@vue/composition-api'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Initialize Firebase
console.log(process.env)
const firebaseApp = initializeApp({
  apiKey: process.env.FirebaseApiKey,
  authDomain: process.env.FirebaseAuthDomain,
  projectId: process.env.FirebaseProjectId,
  storageBucket: process.env.FirebaseStorageBucket,
  messagingSenderId: process.env.FirebaseMessagingSenderId,
  appId: process.env.FirebaseAppId
})
const db = getFirestore()
Vue.prototype.$firebase = {
  db,
  doc,
  getDoc,
  firebaseApp
}
Vue.use(VueCompositionApi)
