<template>
  <div class="kv">
    <img src="~/assets/images/kv.jpg" alt="" class="kv-bg">
    <div class="kv-content">
      <h1 class="kv-content-title">
        トレーニング管理、しませんか？
      </h1>
      <p class="kv-content-description">
        あすトレは将来の筋トレスケジュールや目標設定<br>
        メニュー管理・ボリューム管理やプロテイン管理まで<br>
        あなたのトレーニングを管理して理想の体に近づけるサービスです。
      </p>
      <nuxt-link class="kv-content-link mod__login" to="/login">
        ログイン
      </nuxt-link>
      <nuxt-link class="kv-content-link mod__signup" to="/signup">
        会員登録
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'beforeLogin',
  setup () {
  }
})
</script>

<style lang="scss" scoped>
  @import '~/assets/scss/foundation/variable';
  @import '~/assets/scss/foundation/mixin';
  .kv{
    height: calc(100vh - 64px);
    width: 100%;
    position: relative;
    &::before{
      content: "";
      width: 100%;
      height: 100%;
      z-index: 10;
      position: absolute;
      background: rgba($_black, 0.5);
      top: 0;
      left: 0;
    }
    &-bg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      z-index: 1;
    }
    &-content{
      @include centerByFlex;
      flex-direction: column;
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1000;
      color: $_white;
      &-title{
        text-align: center;
        margin-bottom: 32px;
      }
      &-description{
        text-align: center;
        margin-bottom: 32px;
        line-height: 2;
      }
      &-link{
        @include centerByFlex;
        width: 256px;
        height: 56px;
        border-radius: 4px;
        margin-bottom: 16px;
        &.mod__login{
          background: $_red;
          color: $_white;
        }
        &.mod__signup{
          background: $_yellow;
          color: $_black;
        }
      }
    }
  }
</style>
