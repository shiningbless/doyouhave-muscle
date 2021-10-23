export default function ({ store, redirect }) {
  if (!store.state.userMyself.user.email || !store.state.userMyself.user.uid) { redirect('/signup') }
}
