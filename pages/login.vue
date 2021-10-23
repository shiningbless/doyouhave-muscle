<template>
  <div class="l-main u-w720 u-padding56">
    <h2 class="c-headline u-marginBottom32">
      ログイン
    </h2>
    <v-card v-if="state.loginErrorMessage" class="c-error u-marginBottom32">
      <v-card-title>{{ state.loginErrorMessage }}</v-card-title>
    </v-card>
    <commonInput v-model="state.email" :placeholder="'sample@info.com'" :required="true" class="u-marginBottom24">
      <template #label>
        メールアドレス
      </template>
    </commonInput>

    <commonInput v-model="state.password" :placeholder="'● ● ● ● ● ●'" :required="true" :input-type="'password'" class="u-marginBottom24">
      <template #label>
        パスワード
      </template>
    </commonInput>

    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        elevation="1"
        x-large
        class="u-marginBottom32 u-text__plain btn"
        :disabled="!state.canSubmit"
        @click="emailLogin"
      >
        ログイン
      </v-btn>
    </v-row>

    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        elevation="1"
        x-large
        class="u-text__plain btn"
        @click="gLogin"
      >
        <CommonGoogleLogo size="small" />
        Googleでログイン
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'
import { FirebaseError } from '@firebase/util'

export default defineComponent({
  layout: 'beforeLogin',
  middleware: 'checkLogin',
  setup (_, context) {
    const store = context.root.$store

    const state = reactive({
      password: '',
      email: '',
      submiting: false,
      googleLoading: false,
      loginErrorMessage: '',
      canSubmit: computed(() => {
        if ((state.email && state.password) && !state.googleLoading) {
          return true
        }
        return false
      })
    })

    // メールログイン
    const emailLogin = async () => {
      state.submiting = true
      const registered = await store.dispatch('userMyself/emailLogin', {
        email: state.email,
        password: state.password
      }).catch(e => e)

      if (registered instanceof FirebaseError) {
        switch (registered.code) {
          case 'auth/invalid-email':
            state.loginErrorMessage = 'メールアドレスの形式が正しくありません。'
            break
          case 'auth/user-not-found':
            state.loginErrorMessage = 'メールアドレス、またはパスワードが間違っています。'
            break
          default:
            break
        }
      } else {
        state.loginErrorMessage = ''
        context.root.$router.push('/mypage')
      }

      state.submiting = false
    }

    // Googleログイン
    const gLogin = async () => {
      state.googleLoading = true
      const registered = await store.dispatch('userMyself/googleLogin')
      if (!registered) {
        state.googleLoading = false
        context.root.$router.push('/signup_with_google')
        return
      }
      state.googleLoading = false
      context.root.$router.push('/mypage')
    }

    return {
      state,
      gLogin,
      emailLogin
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~/assets/scss/foundation/variable';
@import '~/assets/scss/foundation/function';
@import '~/assets/scss/foundation/mixin';
.btn{ text-transform: none; }
</style>
