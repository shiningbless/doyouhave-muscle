<template>
  <div class="l-main u-w720 u-padding56">
    <h2 class="c-headline u-marginBottom32">
      新規会員登録
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

    <commonInput v-model="state.name" placeholder="筋肉 太郎" :required="true" :input-type="'text'" class="u-marginBottom24">
      <template #label>
        お名前
      </template>
    </commonInput>

    <div>
      <commonRadio v-model="state.sex" :values="sex" name="sex" :required="true">
        <template #label>
          性別
        </template>
      </commonRadio>
    </div>

    <v-row
      align="center"
      justify="space-around"
    >
      <v-btn
        elevation="1"
        x-large
        class="u-marginBottom32 u-text__plain btn"
        :disabled="!state.canSubmit"
        @click="emailSignUp"
      >
        会員登録
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
        Googleで登録
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
      name: '',
      sex: '',
      submiting: false,
      googleLoading: false,
      loginErrorMessage: '',
      canSubmit: computed(() => {
        if ((state.email && state.password && state.name && state.sex) && !state.googleLoading) {
          return true
        }
        return false
      })
    })

    const sex = [
      {
        id: 1,
        value: 'male',
        name: '男性'
      },
      {
        id: 2,
        value: 'female',
        name: '女性'
      }
    ]

    // メール登録
    const emailSignUp = async () => {
      state.submiting = true
      const result = await store.dispatch('userMyself/emailSignUp', {
        email: state.email,
        password: state.password,
        name: state.name,
        sex: state.sex
      })
      if (result instanceof FirebaseError) {
        switch (result.code) {
          case 'auth/invalid-email':
            state.loginErrorMessage = 'メールアドレスの形式が正しくありません。'
            break
          case 'auth/weak-password':
            state.loginErrorMessage = 'パスワードは6文字以上で入力してください。'
            break
          case 'auth/email-already-in-use':
            state.loginErrorMessage = 'このメールアドレスはすでに使用されています。'
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
        context.root.$router.push('/signup_with_google')
      } else {
        context.root.$router.push('/mypage')
      }

      state.googleLoading = false
    }

    return {
      state,
      sex,
      gLogin,
      emailSignUp
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
