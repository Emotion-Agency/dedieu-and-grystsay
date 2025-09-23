<script setup lang="ts">
import type { iImage } from '~/types/story'

interface iProps {
  images: iImage[]
  currentIndex?: number
}

defineProps<iProps>()

const isModalOpen = defineModel<boolean>('open')
</script>

<template>
  <Dialog v-model:open="isModalOpen" class="slider-modal-dialog">
    <div class="slider-modal">
      <FullPageAssets
        :images="images"
        :current-index="currentIndex"
        class="slider-modal__asset"
      />
    </div>
  </Dialog>
</template>

<style lang="scss">
.slider-modal-dialog {
  .dialog__window {
    height: 100%;
    width: 100%;
    padding: vw(10);

    @media (max-width: $br1) {
      padding: 10px;
    }
  }
}

.slider-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.slider-modal__asset {
  padding: 0 !important;
  height: 100%;

  .full-assets__wrapper {
    height: 100%;
  }

  .full-slider {
    height: 100%;
  }
}
</style>
