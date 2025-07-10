<script setup lang="ts">
import type { iHomeAllProjects } from '~/types/homeTypes'

interface IProps {
  content: iHomeAllProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="all-projects">
    <div class="all-projects__wrapper">All Projects</div>
  </section>
</template>

<style scoped lang="scss"></style>
