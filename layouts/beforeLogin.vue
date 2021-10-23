<template>
  <v-app>
    <header class="l-header">
      <div class="l-header-left">
        <headerlogo />
        あすトレ
      </div>

      <div class="l-header-right">
        <nuxt-link class="l-header-right-link" to="/signup">
          新規登録
        </nuxt-link>
        <nuxt-link class="l-header-right-link" to="/login">
          ログイン
        </nuxt-link>
      </div>
    </header>
    <v-main><Nuxt /></v-main>
    <v-footer />
  </v-app>
</template>
