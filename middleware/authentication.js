import Cookies from 'universal-cookie'

/**
 * ログインが必要なページにアクセスしたときに、ログインステータスを確認して
 * ログインしていないようであればログインページに飛ばす
 */
export default async function ({ store, redirect }) {
  const cookies = new Cookies()
  const uid = cookies.get('uid')
  // ログインしている場合（cookie情報が登録されている場合）
  if (uid && uid !== 'undefined') {
    // storeにユーザーが登録されていない場合
    if (!store.state.userMyself.user.uid) {
      console.log('uid', uid)
      await store.dispatch('userMyself/getUserInfo', uid)
    }
  } else {
    redirect('/login')
  }
}
