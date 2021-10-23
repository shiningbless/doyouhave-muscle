<template>
  <div class="header-logo">
    <img src="~/assets/images/logo.svg" alt="">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({

})
</script>

<style lang="scss" scoped>
.header-logo{
  width: 48px;
  height: 48px;
  display: block;
  margin-right: 16px;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
