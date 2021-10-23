<template>
  <div>
    <label class="common-radio-title"><slot name="label">これはデフォルト値です。</slot><span v-if="required" class="mod__required">※必須</span></label>
    <div v-for="value in values" :key="value.id" class="common-radio">
      <input
        :id="value.value"
        :name="name"
        :value="value.value"
        class="common-radio-form"
        type="radio"
        @change="$emit('input', value.value)"
      >
      <label :for="value.value" class="common-radio-label">{{ value.name }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
      default: ''
    },
    values: {
      required: true,
      type: Array,
      default: () => { return [] }
    },
    required: {
      required: true,
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~/assets/scss/foundation/variable';
@import '~/assets/scss/foundation/mixin';
@import '~/assets/scss/foundation/function';

.common-radio-title{
  font-size: map-get($_font-size, md);
  display: block;
  .mod__required{
    font-size: map-get($_font-size, min);
    color: $_red;
  }
}
.common-radio{
  display: inline-block;
  margin-right: 16px;
  &-label{
    font-size: map-get($_font-size, md);
    display: inline-block;
    padding-left: 20px;
    position: relative;
    &::before{
      content: "";
      position: absolute;
      display: block;
      width: 16px;
      height: 16px;
      background: transparent;
      border-radius: 50%;
      border: 1px solid $_grayA;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 0;
    }
    &::after{
      content: "";
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      left: 3px;
      background: $_red;
      border-radius: 50%;
      opacity: 0;
    }
  }
  &-form{
    opacity: 0;
    position: absolute;
    top: -1000vh;
    left: -1000vw;
    &:checked + .common-radio-label{
      &::after{ opacity: 1; }
    }
  }
}
</style>
