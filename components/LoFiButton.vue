<script lang="ts" setup>
import type { IButton } from '~/types/button'

const props = withDefaults(defineProps<IButton>(), {
  tag: 'button',
  type: 'button',
  variant: 'light',
})

const tag = computed(() => {
  if (props.tag === 'nuxt-link') {
    return resolveComponent('NuxtLink')
  } else return props.tag ?? 'button'
})

const to = props.tag === 'nuxt-link' ? props.href : undefined
const href = props.tag === 'a' ? props.href : undefined
</script>

<template>
  <component
    :is="tag"
    :type="type"
    :to="to"
    :href="href"
    :target="props.tag === 'a' ? '_blank' : undefined"
    :rel="props.tag === 'a' ? 'noreferer noopener' : undefined"
    class="lofi-btn"
    :class="`lofi-btn--${props.variant}`"
    :disabled="props.disabled"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.lofi-btn {
  @include regular;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: vw(15) vw(45);
  border-radius: vw(100);
  font-size: vw(16);
  letter-spacing: -0.03em;
  line-height: 1.3em;
  text-transform: capitalize;
  transition:
    background-color 0.3s ease,
    opacity 0.3s ease;

  &--light {
    background-color: var(--background);
    color: var(--foreground);

    &:hover:not(:disabled) {
      background-color: var(--foreground-muted);
    }
  }

  &--dark {
    background-color: var(--dark);
    color: var(--background);

    &:hover:not(:disabled) {
      opacity: 0.8;
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: $br1) {
    font-size: 16px;
    padding: 13px 42px;
    border-radius: 100px;
  }
}
</style>
