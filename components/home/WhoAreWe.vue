<script setup lang="ts">
import type { iHomeWhoAreWe } from '~/types/homeTypes'

interface IProps {
  content: iHomeWhoAreWe
}

defineProps<IProps>()
</script>

<template>
  <section class="who-are">
    <div class="who-are__wrapper">Who are we</div>
  </section>
</template>

<style scoped lang="scss"></style>
