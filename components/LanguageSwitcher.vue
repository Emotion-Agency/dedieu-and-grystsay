<script lang="ts" setup>
import type { LocaleObject } from '@nuxtjs/i18n'

interface iProps {
  variant: 'header' | 'menu'
  isContactPage?: boolean
}

defineProps<iProps>()

const { locales, setLocale, locale } = useI18n()
const { isTransitionEnabled } = useAppState()

const handleClick = async (l: LocaleObject) => {
  isTransitionEnabled.value = false
  await nextTick()
  await setLocale(l.code)
  window.location.reload()
}
</script>

<template>
  <div
    class="lang-switch"
    :class="{
      'lang-switch--header': variant === 'header',
      'lang-switch--menu': variant === 'menu',
      'lang-switch--contact': isContactPage && variant === 'header',
    }"
  >
    <button
      v-for="l in locales"
      :key="l.code"
      class="lang-switch__btn"
      :class="{ 'lang-switch__btn--active': l.code === locale }"
      @click="handleClick(l)"
    >
      {{ l.code }}
    </button>
  </div>
</template>

<style lang="scss">
.lang-switch {
  position: relative;
  display: flex;
  align-items: center;
  gap: vw(5);

  &--header {
    @media (max-width: $br1) {
      display: none;
    }
  }

  &--menu,
  &--contact {
    .lang-switch__btn {
      color: var(--background);
      background-color: var(--foreground);

      &--active {
        color: var(--foreground) !important;
        background-color: var(--background);
      }
    }
  }
}

.lang-switch__btn {
  @include medium;
  position: relative;
  background-color: transparent;
  color: var(--foreground);
  font-size: vw(16);
  line-height: 1em;
  width: vw(25);
  height: vw(25);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    border 0.3s ease;

  &--active {
    color: var(--background);
    background-color: var(--foreground);
  }

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }

  @media (max-width: $br1) {
    font-size: 18px;
    width: 27px;
    height: 27px;
  }
}
</style>
