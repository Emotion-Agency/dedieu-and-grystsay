<script setup lang="ts">
import type { iCurrentProjectDivider } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectDivider
}

defineProps<IProps>()
</script>

<template>
  <section class="p-divider container">
    <div class="p-divider__wrapper">Divider section</div>
  </section>
</template>

<style scoped lang="scss"></style>
