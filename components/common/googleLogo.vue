<template>
  <img src="~/assets/images/google-logo.png" alt="" class="googleLogo" :class="classSize">
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'medium',
      required: true
    }
  },
  setup (props) {
    const classSize = ref(props.size)
    return {
      classSize
    }
  }
})
</script>

<style lang="scss" scoped>
.googleLogo{
  margin-right: 8px;
  &.small{
    width: 24px;
    height: 24px;
  }
  &.medium{
    width: 32px;
    height: 32px;
  }
  &.large{
    width: 56px;
    height: 56px;
  }
}
</style>
