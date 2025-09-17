<script setup lang="ts">
import type { iFullPageAssets } from '~/types/fullAssetsTypes'

interface IProps {
  content: iFullPageAssets
}

defineProps<IProps>()
</script>

<template>
  <section class="pr-full-assets">
    <FullPageAssets :content="content" />
  </section>
</template>

<style scoped lang="scss">
.pr-full-assets {
  @media (max-width: $br1) {
    display: none;
  }
}
</style>
