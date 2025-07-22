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
  border-radius: 100%;
  width: vw(272);
  height: vw(272);
  text-transform: uppercase;
  @include medium;
  font-size: vw(30);
  line-height: 1.13em;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(0.9);
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.5);
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
