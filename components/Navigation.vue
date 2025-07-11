<script lang="ts" setup>
import type { iMenuLink } from '~/types/menuTypes'

interface iProps {
  links: iMenuLink[]
  variant: 'header' | 'footer' | 'menu'
}

defineProps<iProps>()

const emit = defineEmits(['close'])

const localePath = useLocalePath()
</script>

<template>
  <nav
    class="navigation"
    :class="{
      'navigation--header': variant === 'header',
      'navigation--footer': variant === 'footer',
      'navigation--menu': variant === 'menu',
    }"
  >
    <div v-for="(link, idx) in links" :key="idx" class="navigation__item">
      <NuxtLink
        :to="localePath(`/${link?.url?.cached_url?.replace(/^\/+/, '')}`)"
        class="underline navigation__link"
        @click="emit('close')"
      >
        {{ link?.label }}
      </NuxtLink>
      <div class="navigation__link-divider" />
    </div>
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  align-items: center;
  position: relative;

  .router-link-active {
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
      pointer-events: none;
    }

    &:hover::before {
      width: 0;
    }
  }

  &--header,
  &--footer {
    text-transform: lowercase;

    .navigation__link {
      @include medium;
      font-size: vw(16);

      @media (max-width: $br1) {
        font-size: size(16, 14);
      }

      @media (max-width: $br4) {
        font-size: 14px;
      }
    }
  }

  &--header {
    .navigation__link {
      color: var(--foreground);
    }

    @media (max-width: $br1) {
      display: none;
    }
  }

  &--footer {
    .navigation__link {
      color: var(--background);
    }

    .navigation__link-divider {
      display: none;
    }
  }

  &--menu {
    @include semibold;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    gap: vw(26);
    color: var(--background);
    font-size: vw(40);

    @media (max-width: $br1) {
      gap: 26px;
      font-size: 40px;
    }

    .navigation__link-divider {
      display: none;
    }
  }
}

.navigation__item {
  display: flex;
  align-items: center;
}

.navigation__link {
  transition: color 0.3s ease;
  line-height: 1em;
  text-align: center;
  position: relative;
}

.navigation__link-divider {
  display: block;
  width: 1px;
  align-self: stretch;
  background-color: var(--foreground);
  margin: 0 vw(20);

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
