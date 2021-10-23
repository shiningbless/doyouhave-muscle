<template>
  <p>{{ user }}</p>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  middleware: 'authentication',
  setup (_, { root }) {
    const user = computed(() => root.$store.state.userMyself.user)

    return { user }
  }
})
</script>
