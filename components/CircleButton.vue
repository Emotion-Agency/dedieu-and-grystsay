<script setup lang="ts">
import type { IButton } from '~/types/button'

const props = withDefaults(defineProps<IButton>(), {
  tag: 'button',
  type: 'button',
  variant: 'light',
  direction: 'left',
})

const emit = defineEmits(['click'])

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
    class="circle-button"
    :class="{
      'circle-button--left': direction === 'left',
      'circle-button--right': direction === 'right',
    }"
    @click="emit('click')"
    :disabled="props.disabled"
  >
    <span>
      <slot />
    </span>
  </component>
</template>

<style lang="scss">
.circle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark);
  color: var(--background);
  border-radius: 100%;
  width: vw(272);
  height: vw(272);
  text-transform: uppercase;
  @include medium;
  font-size: vw(30);
  padding: vw(10);
  text-align: center;
  line-height: 1.13em;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  // &:hover {
  //   transform: scale(0.9);
  //   box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.5);
  // }

  &:hover {
    span {
      animation-play-state: paused;
    }
  }

  span {
    display: flex;
    animation: rotate-animation 7s linear infinite;
  }

  @media (max-width: $br1) {
    width: 181px;
    height: 181px;
    font-size: 20px;
    line-height: 1.2em;
  }
}

@keyframes rotate-animation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
