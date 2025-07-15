<script setup lang="ts"></script>

<template>
  <div class="page-layout">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
