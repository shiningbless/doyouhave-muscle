<template>
  <div class="l-main u-w720 u-padding56">
    <h2 class="c-headline u-marginBottom32">
      新規会員登録
    </h2>

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
        @click="googleSignUp"
      >
        会員登録
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@vue/composition-api'

export default defineComponent({
  layout: 'beforeLogin',
  middleware: 'moveSignInPageAtSignUpWithGoogle',
  setup (_, context) {
    const store = context.root.$store
    const user = computed(() => store.state.userMyself.user)

    const state = reactive({
      password: '',
      email: user.value.email,
      name: '',
      sex: '',
      submiting: false,
      googleLoading: false,
      loginError: false,
      canSubmit: computed(() => {
        if ((state.name && state.sex) && !state.googleLoading) {
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

    const googleSignUp = async () => {
      await store.dispatch('userMyself/googleSignUp', {
        name: state.name,
        sex: state.sex
      })
      context.root.$router.push('/mypage')
    }

    return {
      state,
      sex,
      googleSignUp
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
