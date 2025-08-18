<script lang="ts" setup>
import type { iMadeByContent } from '~/types/madeByTypes'

interface iProps {
  color: 'light' | 'dark'
  content: iMadeByContent
}

defineProps<iProps>()
</script>

<template>
  <a
    :href="content?.link[0]?.url?.cached_url"
    target="_blank"
    rel="noopener noreferrer"
    class="made-by-text underline"
    :class="{
      'made-by-text--light': color === 'light',
      'made-by-text--dark': color === 'dark',
    }"
  >
    {{ content?.link[0]?.label }}
  </a>
</template>

<style lang="scss">
.made-by-text {
  @include medium;
  display: block;
  font-size: vw(16);
  position: relative;

  &--light {
    color: var(--background);
  }

  &--dark {
    color: var(--foreground);
  }

  @media (max-width: $br1) {
    font-size: size(16, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}
</style>
