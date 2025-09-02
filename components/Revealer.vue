<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isContactPage = computed(() => route.path.includes('/contact'))
</script>

<template>
  <div :class="['revealer', { 'revealer--contact': isContactPage }]"></div>
</template>

<style scoped lang="scss">
.revealer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--background);
  display: none;
  z-index: 110;
  transition: background-color 3s ease;

  &--contact {
    background-color: var(--foreground);
  }
}
</style>
