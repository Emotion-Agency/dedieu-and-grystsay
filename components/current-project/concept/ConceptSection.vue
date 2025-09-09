<script setup lang="ts">
import { gsap, SplitText } from '~/libs/gsap'
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iCurrentProjectConcept } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectConcept
}

const props = defineProps<IProps>()

const { story } = await useGlobalStory()
const isMobile = useSSRMediaQuery('(max-width: 960px)')

const images = props.content.corousel

const $el = ref<HTMLElement | null>(null)

let tl: GSAPTimeline

onMounted(async () => {
  await document.fonts.ready

  if ($el.value) {
    const $title = $el.value.querySelector('.p-concept__title')
    const $text = $el.value.querySelector('.p-concept__text')

    const titleSplit = new SplitText($title, {
      type: 'lines',
    })
    const textSplit = new SplitText($text, {
      type: 'lines',
    })

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set([titleSplit.lines, textSplit.lines], {
      opacity: 0,
      translateY: 20,
    })

    tl.to(
      titleSplit.lines,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
      },
      '<'
    )
    tl.to(
      textSplit.lines,
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'expo.out',
        stagger: 0.1,
      },
      '<20%'
    )
  }
})

onBeforeUnmount(() => {
  tl?.kill()
})
</script>

<template>
  <section ref="$el" class="p-concept container">
    <div class="p-concept__wrapper">
      <div class="p-concept__content">
        <h2 class="p-concept__title">
          {{ content?.title }}
        </h2>
        <p class="p-concept__text">
          {{ content?.text }}
        </p>
      </div>
      <CurrentProjectConceptMobile v-if="isMobile" :images />
      <CurrentProjectConceptDesktop
        v-else
        :images
        :next-slide-button="story?.content?.slides_next"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.p-concept {
  padding-top: vw(60);
  padding-bottom: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
    padding-bottom: 0;
  }
}

.p-concept__wrapper {
  display: flex;

  @media (min-width: $br1) {
    align-items: center;
    justify-content: space-between;
    gap: vw(24);
  }

  @media (max-width: $br1) {
    flex-direction: column;
    gap: 60px;
  }
}

.p-concept__content {
  display: flex;
  flex-direction: column;
  gap: vw(73);
  flex: 1 0 auto;

  @media (max-width: $br1) {
    gap: 20px;
  }
}

.p-concept__title {
  @include medium;
  font-size: vw(150);
  line-height: 0.82em;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  word-break: break-word;
  max-width: vw(500);

  @media (max-width: $br1) {
    font-size: size(120, 40);
    max-width: 100%;
  }

  @media (max-width: $br4) {
    font-size: 40px;
  }
}

.p-concept__text {
  @include medium;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  text-transform: capitalize;
  max-width: vw(425);
  margin-left: vw(223);

  @media (max-width: $br1) {
    font-size: 18px;
    text-transform: lowercase;
    margin-left: 0;
    max-width: 100%;
  }
}
</style>
