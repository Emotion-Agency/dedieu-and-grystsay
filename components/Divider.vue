<script setup lang="ts">
import type { iDividerContent } from '~/types/dividerTypes'

interface iProps {
  content: iDividerContent
}

defineProps<iProps>()
</script>

<template>
  <div
    v-if="content?.show_on_mobile || content?.show_on_desktop"
    class="divider container"
    :class="{
      'divider--mob': content?.show_on_mobile && !content?.show_on_desktop,
      'divider--desk': content?.show_on_desktop && !content?.show_on_mobile,
    }"
  >
    <div class="divider__wrapper" />
  </div>
</template>

<style scoped lang="scss">
.divider {
  display: block;

  &--mob {
    display: none;
    @media (max-width: $br1) {
      display: block;
    }
  }

  &--desk {
    @media (max-width: $br1) {
      display: none;
    }
  }
}

.divider__wrapper {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);
}
</style>
