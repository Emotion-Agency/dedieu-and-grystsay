<script setup lang="ts">
import { useFormStory } from '~/composables/stories/formStory'

const { story } = await useFormStory()

const { isShowThankYou } = useThankyouScreen()
</script>

<template>
  <Dialog v-model:open="isShowThankYou">
    <div class="thankyou-modal">
      <h2 class="thankyou-modal__text" v-html="story?.content?.thankyou_text" />
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
.thankyou-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.thankyou-modal__text {
  @include medium;
  font-size: vw(40);
  line-height: 1.15em;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  max-width: vw(450);

  @media (max-width: $br1) {
    max-width: 100%;
    font-size: 40px;
  }
}
</style>
