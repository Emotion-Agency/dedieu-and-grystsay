<script setup lang="ts">
import type { iHomeProjectsCarousel } from '~/types/homeTypes'

interface IProps {
  content: iHomeProjectsCarousel
}

defineProps<IProps>()
</script>

<template>
  <section class="p-carousel">
    <div class="p-carousel__wrapper">Project carousel</div>
  </section>
</template>

<style scoped lang="scss"></style>
