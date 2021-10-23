/**
 * ログインページ・サインアップページに遷移する際に
 * すでにログインしていたらマイページへ飛ばす
 */
import Cookies from 'universal-cookie'
export default async function ({ store, redirect }) {
  const cookies = new Cookies()
  const uid = cookies.get('uid')

  // ストアにユーザー情報が登録されておらず、uidが保存されていたらユーザー情報を取得する
  if (!store.state.userMyself.user.uid && (uid && uid !== 'undefined')) {
    await store.dispatch('userMyself/getUserInfo', uid)
    redirect('/mypage')
  } else if (store.state.userMyself.user.uid && (uid && uid !== 'undefined')) {
    // ストアに登録されている場合
    redirect('/mypage')
  }
}
