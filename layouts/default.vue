<script setup lang="ts">
const route = useRoute()

const isContactPage = computed(() => route.path.includes('/contact'))
</script>

<template>
  <div class="page-layout" :class="{ 'page-layout--contact': isContactPage }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &--contact {
    background-color: var(--foreground);
  }
}
</style>
