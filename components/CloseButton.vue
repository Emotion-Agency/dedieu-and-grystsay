<script setup lang="ts">
interface IProps {
  color?: 'light' | 'dark'
}

defineProps<IProps>()

const emit = defineEmits(['close'])
</script>

<template>
  <button
    type="button"
    class="close-button"
    :class="{
      'close-button--light': color === 'light',
      'close-button--dark': color === 'dark',
    }"
    @click="emit('close')"
  >
    <span />
    <span />
  </button>
</template>

<style lang="scss">
.close-button {
  width: vw(34);
  height: vw(34);
  background: transparent;
  position: absolute;
  top: vw(20);
  right: vw(20);
  z-index: 120;
  border-radius: 100%;
  border: 1px solid var(--background);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(0.9);
  }

  @media (max-width: $br1) {
    width: 34px;
    height: 34px;
    top: 20px;
    right: 20px;
  }

  span {
    position: absolute;
    display: block;
    background: currentColor;
    transition: all 0.3s ease;
    background-color: var(--background);
    left: 50%;
    top: 50%;
    width: 40%;
    height: 2px;

    &:nth-child(1) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }

  &--light {
    border-color: var(--background);
    span {
      background-color: var(--background);
    }
  }

  &--dark {
    border-color: var(--foreground);
    span {
      background-color: var(--foreground);
    }
  }
}
</style>
