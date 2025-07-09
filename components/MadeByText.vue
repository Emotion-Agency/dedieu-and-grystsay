<script lang="ts" setup></script>

<template>
  <p class="made-by-text">made by growdient</p>
</template>

<style scoped lang="scss">
.made-by-text {
  @include medium;
  font-size: vw(16);
  color: var(--background);
  text-transform: lowercase;

  @media (max-width: $br1) {
    font-size: size(16, 14);
  }

  @media (max-width: $br4) {
    font-size: 14px;
  }
}
</style>
