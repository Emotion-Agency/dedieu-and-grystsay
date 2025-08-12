<script setup lang="ts">
import type { iVisionContent } from '~/types/visionTypes'

interface IProps {
  content: iVisionContent
}

defineProps<IProps>()
</script>

<template>
  <section class="p-vision container">
    <div class="p-vision__wrapper">
      <Vision :content="content" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.p-vision {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 60px;
  }
}
</style>
