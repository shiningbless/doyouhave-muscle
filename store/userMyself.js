import { FirebaseError } from '@firebase/util'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Cookies from 'universal-cookie'

// state
export const state = () => ({
  user: {}
})

// mutations
export const mutations = {
  set (state, data) {
    state.user = data
  },
  reset (state) {
    state.user = {}
  }
}

export const actions = {
  async googleLogin ({ commit }) {
    const user = await gLogin()
    // ログインを途中でやめた時用
    if (!user) { return false }

    const registeredUser = await searchUser(user.uid)
    if (!registeredUser) {
      commit('set', { email: user.email, uid: user.uid })
      return false
    }
    const cookies = new Cookies()
    cookies.set('uid', user.uid)

    commit('set', registeredUser)
    return true
  },

  async googleSignUp ({ state, commit }, { name, sex }) {
    // firestoreにユーザー登録
    const userData = {
      email: state.user.email,
      name,
      sex
    }
    const result = await setDoc(doc($nuxt.$firebase.db, 'users', state.user.uid), userData).catch(e => e)
    if (result instanceof FirebaseError) { return false }

    // ここまできたら登録完了
    const user = await searchUser(state.user.uid)
    commit('set', user)
    const cookies = new Cookies()
    cookies.set('uid', user.uid)
    return true
  },

  async emailLogin ({ commit }, { email, password }) {
    const result = await emailLogin(email, password).catch(e => e)

    // emailログインでエラーが起きた時
    if (result instanceof FirebaseError) { return result }

    // ここから下のresultはuserが入っている
    const user = await searchUser(result.uid)
    commit('set', user)
    const cookies = new Cookies()
    cookies.set('uid', result.uid)
    return true
  },

  async emailSignUp ({ commit }, { email, password, name, sex }) {
    // firebase Authenticationに登録
    const result = await signupUserWithEmailAndPassword(email, password).catch(e => e)
    if (result instanceof FirebaseError) { return result }
    const userData = {
      email,
      name,
      sex
    }
    const regist = await setDoc(doc($nuxt.$firebase.db, 'users', result.uid), userData).catch(e => e)
    if (regist instanceof FirebaseError) { return false }
    const user = await searchUser(result.uid)
    commit('set', user)
    const cookies = new Cookies()
    cookies.set('uid', result.uid)
    return true
  },
  async getUserInfo ({ commit }, uid) {
    const user = await searchUser(uid).catch(e => e)
    if (user instanceof FirebaseError) { return false }

    commit('set', user)
    return true
  }
}

export const getters = {

}

/**
 * Googleでログインする関数
 */
async function gLogin () {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const result = await signInWithPopup(auth, provider).catch(() => false)

  if (result === false) { return false }

  // const credential = GoogleAuthProvider.credentialFromResult(result)
  // const token = credential.accessToken
  // if (token) { localStorage.setItem('access_token', token) }

  const user = result.user
  // ここまで来たら登録しているかしてないか確認する
  return user
}

/**
 * メールアドレスとパスワードでログインする関数
 */
async function emailLogin (email, password) {
  const auth = getAuth()
  const userCredential = await signInWithEmailAndPassword(auth, email, password).catch(e => e)
  // エラーだったらそのままオブジェクトを返す
  if (userCredential instanceof Error) { return userCredential }

  // エラーじゃなかったらuser情報を返す
  const user = userCredential.user
  return user
}

/**
 * 新規登録（メールアドレスとパスワード）
 */
async function signupUserWithEmailAndPassword (email, password) {
  const auth = getAuth()
  const userCredential = await createUserWithEmailAndPassword(auth, email, password).catch(e => e)
  if (userCredential instanceof FirebaseError) { return userCredential }
  const user = userCredential.user
  return user
}

/**
 * firebaseから帰ってきたuidを元にその人が登録済みかどうかを調べる関数
 */
async function searchUser (uid) {
  const docRef = doc($nuxt.$firebase.db, 'users', uid)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    return false
  }
}
