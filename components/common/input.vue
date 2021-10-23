<template>
  <div class="common-input">
    <label :for="id" class="common-input-label"><slot name="label">これはデフォルト値です。</slot><span v-if="required" class="mod__required">※必須</span></label>
    <input
      :id="id"
      v-model="input"
      :placeholder="placeholder"
      class="common-input-form"
      :type="inputType"
      @input="$emit('input', input)"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    init: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    // ユニークIDの生成 start
    let str: string = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 8; i++) { str += chars.charAt(Math.floor(Math.random() * chars.length)) }
    const id = ref(str)
    const input = ref(props.init)
    // ユニークIDの生成 end
    return { id, input }
  }
})
</script>

<style lang="scss" scoped>
@import '~/assets/scss/foundation/variable';
@import '~/assets/scss/foundation/mixin';
@import '~/assets/scss/foundation/function';

.common-input{
  &-label{
    font-size: map-get($_font-size, md);
    display: block;
    .mod__required{
      font-size: map-get($_font-size, min);
      color: $_red;
    }
  }
  &-form{
    font-size: map-get($_font-size, md);
    display: block;
    padding: 8px;
    background: $_grayF2;
    width: 100%;
    letter-spacing: 1px;
  }
}
</style>
