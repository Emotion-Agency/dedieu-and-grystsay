<script setup lang="ts">
import { DialogContent, DialogOverlay, DialogRoot, DialogTitle } from 'reka-ui'
import type { HtmlHTMLAttributes } from 'vue'

defineProps<{
  windowAttrs?: HtmlHTMLAttributes
}>()

const isOpen = defineModel<boolean>('open')

watch(isOpen, () => {
  if (isOpen.value) {
    window.elenis.stop()
    return
  } else {
    window.elenis.start()
  }
})
</script>

<template>
  <DialogRoot v-slot="{ open }" v-model:open="isOpen">
    <Transition name="dialog">
      <Teleport to="#teleports">
        <div v-if="open" class="dialog" v-bind="$attrs">
          <DialogOverlay class="dialog__backdrop" @click="isOpen = false" />
          <DialogContent
            class="dialog__window"
            :aria-describedby="undefined"
            v-bind="windowAttrs"
          >
            <DialogTitle class="dialog__title">Modal window</DialogTitle>
            <CloseButton @click="isOpen = false" />
            <slot />
          </DialogContent>
        </div>
      </Teleport>
    </Transition>
  </DialogRoot>
</template>

<style scoped lang="scss">
.dialog {
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 110;
}

.dialog__backdrop {
  inset: 0;
  background-color: var(--backdrop);
  position: fixed;
  z-index: 1;
  // backdrop-filter: blur(3px);
}

.dialog__window {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: var(--foreground);
  color: var(--background);
  z-index: 50;

  @media (min-width: $br1) {
    max-height: 95vh;
    max-width: 95vw;
    min-width: vw(924);
    padding: vw(145) vw(20);
    border: 1px solid var(--background);
  }

  @media (max-width: $br1) {
    width: 100%;
    height: 100%;
    padding: 25px;
  }
}

.dialog__title {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.dialog__close {
  width: vw(34);
  height: vw(34);
  background: transparent;
  position: absolute;
  top: vw(20);
  right: vw(20);
  z-index: 120;
  border-radius: 100%;
  border: 1px solid var(--background);
  transition: border 0.3s ease;

  @media (max-width: $br1) {
    width: 34px;
    height: 34px;
    top: 20px;
    right: 20px;
  }

  span {
    position: absolute;
    display: block;
    background: currentColor;
    transition: all 0.3s ease;
    background-color: var(--background);
    left: 50%;
    top: 50%;
    width: 40%;
    height: 2px;

    &:nth-child(1) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:nth-child(2) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}

.dialog-enter-from {
  opacity: 0;
  .dialog__window {
    opacity: 0;
    transform: translateY(50px);
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.5s ease;
}

.dialog-enter,
.dialog-leave-to {
  opacity: 0;
  .dialog__window {
    opacity: 0;
    transform: translateY(50px);
  }
}
</style>
