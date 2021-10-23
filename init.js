// Import the functions you need from the SDKs you need
import Vue from 'vue'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

import VueCompositionApi from '@vue/composition-api'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD9FmWd3qn9dAEtqIXstAAOox4YFtIRLm8',
  authDomain: 'doyouhave-muscle.firebaseapp.com',
  projectId: 'doyouhave-muscle',
  storageBucket: 'doyouhave-muscle.appspot.com',
  messagingSenderId: '444191949429',
  appId: '1:444191949429:web:0f2cb5c0880aff47edae3c'
}
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore()
Vue.prototype.$firebase = {
  db,
  doc,
  getDoc,
  firebaseApp
}
Vue.use(VueCompositionApi)
