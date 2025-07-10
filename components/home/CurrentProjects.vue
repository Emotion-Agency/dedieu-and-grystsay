<script setup lang="ts">
import type { iHomeCurrentProjects } from '~/types/homeTypes'

interface IProps {
  content: iHomeCurrentProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__wrapper">Current Projects</div>
  </section>
</template>

<style scoped lang="scss"></style>
