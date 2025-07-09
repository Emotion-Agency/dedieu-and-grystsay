<script lang="ts" setup>
interface iProps {
  variant: 'header' | 'menu'
}

defineProps<iProps>()
</script>

<template>
  <div
    class="lang-switch"
    :class="{
      'lang-switch--header': variant === 'header',
      'lang-switch--menu': variant === 'menu',
    }"
  >
    <button class="lang-switch__btn">fr</button>
    <button class="lang-switch__btn">en</button>
  </div>
</template>

<style scoped lang="scss">
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

  &--menu {
    .lang-switch__btn {
      color: var(--background);
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

  &:hover {
    color: var(--background);
    background-color: var(--foreground);
  }

  @media (max-width: $br1) {
    &:active {
      border-color: var(--background);
    }
  }

  @media (max-width: $br1) {
    font-size: 18px;
    width: 27px;
    height: 27px;
  }
}
</style>
