<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<template>
  <button type="button" class="text-button" @click="emit('click')">
    <IconsRightArrow />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.text-button {
  display: flex;
  align-items: center;
  gap: vw(15);
  background-color: transparent;
  @include medium;
  font-size: vw(18);
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
}
</style>
