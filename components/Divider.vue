<script setup lang="ts"></script>

<template>
  <div class="divider container">
    <div class="divider__wrapper" />
  </div>
</template>

<style scoped lang="scss">
.divider {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}

.divider__wrapper {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);
}
</style>
