<script setup lang="ts">
import type { ImgHTMLAttributes, ReservedProps, VideoHTMLAttributes } from 'vue'
import CustomImage from '~/components/CustomImage.vue'
import CustomVideo from '~/components/CustomVideo.vue'

interface BaseProps {
  src: string
}

interface ImageProps {
  alt?: string
  quality?: number
  width?: number
  height?: number
  preload?: boolean
  imgAttributes?: ImgHTMLAttributes & ReservedProps
}

interface VideoProps {
  videoAttributes?: VideoHTMLAttributes & ReservedProps
  isPlaying?: boolean
  isFullscreen?: boolean
  onFullscreen?: (val: boolean) => void
}

type TProps = BaseProps & Partial<ImageProps & VideoProps>

const props = defineProps<TProps>()

const fileType = computed(() => {
  if (isVideo(props.src)) return 'video'
  if (isPicture(props.src)) return 'image'
  return 'unknown'
})
</script>

<template>
  <component
    :is="CustomImage"
    v-if="fileType === 'image'"
    :src="src"
    :alt="alt"
    :quality="quality"
    :width="width"
    :height="height"
    :preload="preload"
    :img-attributes="imgAttributes"
  />
  <component
    :is="CustomVideo"
    v-else-if="fileType === 'video'"
    :url="src"
    :video-attributes="videoAttributes"
    :is-playing="isPlaying"
    :is-fullscreen="isFullscreen"
    @fullscreen="onFullscreen"
  />
  <div v-else>Unsupported file type</div>
</template>
