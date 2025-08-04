<script setup lang="ts">
import type { IButton } from '~/types/button'

const props = withDefaults(defineProps<IButton>(), {
  tag: 'button',
  type: 'button',
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
    class="text-button"
    :class="{ 'text-button--reversed': props.isReversed }"
  >
    <IconsRightArrow />
    <span>
      <slot />
    </span>
  </component>
</template>

<style scoped lang="scss">
.text-button {
  display: flex;
  align-items: center;
  gap: vw(15);
  background-color: transparent;
  @include medium;
  font-size: vw(18);
  color: inherit;
  text-transform: capitalize;

  &:hover {
    span::before {
      width: 100%;
    }

    svg {
      transform: scale(0.8);
    }
  }

  svg {
    display: block;
    width: vw(32.5);
    height: vw(13);
    transition: transform 0.3s ease;
  }

  span {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
      pointer-events: none;
    }
  }

  @media (max-width: $br1) {
    font-size: 18px;
    gap: 15px;

    svg {
      width: 32.5px;
      height: 13px;
    }
  }

  &--reversed {
    svg {
      transform: rotate(180deg);
    }

    &:hover {
      svg {
        transform: scale(0.8) rotate(180deg);
      }
    }
  }
}
</style>
