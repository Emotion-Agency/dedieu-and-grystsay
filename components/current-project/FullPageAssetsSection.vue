<script setup lang="ts">
import type { iFullPageAssets } from '~/types/fullAssetsTypes'

interface IProps {
  content: iFullPageAssets
  isLastFullAssets?: boolean
}

defineProps<IProps>()
</script>

<template>
  <div class="pr-full-assets" :class="{ 'last-full-assets': isLastFullAssets }">
    <FullPageAssets :content="content" />
  </div>
</template>

<style scoped lang="scss">
.last-full-assets {
  @media (max-width: $br1) {
    display: none;
  }
}
</style>
