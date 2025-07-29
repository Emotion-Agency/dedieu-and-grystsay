<script setup lang="ts">
import type { iImage } from '~/types/story'

interface iProps {
  video: iImage
}

defineProps<iProps>()

const isModalOpen = defineModel<boolean>('open')
</script>

<template>
  <Dialog v-model:open="isModalOpen" class="video-modal-dialog">
    <div class="video-modal">
      <CustomVideo
        :url="video.filename"
        :video-attributes="{ controls: true }"
      />
    </div>
  </Dialog>
</template>

<style lang="scss">
.video-modal-dialog {
  .dialog__window {
    height: 100%;
    width: 100%;
    padding: vw(10);

    @media (max-width: $br1) {
      padding: 10px;
    }
  }
}

.video-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .video {
    width: 100%;
    height: 100%;

    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
