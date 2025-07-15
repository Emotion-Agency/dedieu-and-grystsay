<script setup lang="ts">
interface iProps {
  direction: 'left' | 'right'
}

defineProps<iProps>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    type="button"
    class="circle-button"
    :class="{
      'circle-button--left': direction === 'left',
      'circle-button--right': direction === 'right',
    }"
    @click="emit('click')"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.circle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark);
  color: var(--background);
  transition: transform 0.3s ease;
  border-radius: 100%;
  width: vw(272);
  height: vw(272);
  text-transform: uppercase;
  @include medium;
  font-size: vw(30);
  line-height: 1.13em;

  &--left {
    transform: rotate(25deg);

    &:hover {
      transform: rotate(25deg) scale(0.9);
    }
  }

  &--right {
    transform: rotate(-25deg);

    &:hover {
      transform: rotate(-25deg) scale(0.9);
    }
  }

  @media (max-width: $br1) {
    width: 181px;
    height: 181px;
    line-height: 1.2em;
    font-size: 20px;
  }
}
</style>
