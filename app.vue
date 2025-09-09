<script setup lang="ts">
import imagesLoaded from 'imagesloaded'
import { useFonts } from '~/composables/fonts'

useFonts()

const { isFirstLoad, init } = useLoadingAnimation()

const loadingAnimation = async () => {
  window.elenis.stop()
  await init()
  window.elenis.start()
}

onMounted(async () => {
  const { detectOrientationChanges } = await import(
    '~/utils/detectLandscapeOrientation'
  )

  detectOrientationChanges()

  const ilInstance = imagesLoaded(document.body, { background: true })

  ilInstance.on('done', () => {
    loadingAnimation()
  })

  ilInstance.on('fail', () => {
    loadingAnimation()
  })
})

useHead({
  htmlAttrs: {
    lang: 'en',
    id: 'scroll-container',
  },
})

const route = useRoute()

const isContactPage = computed(() => route.path.includes('/contact'))
</script>

<template>
  <div id="app" class="app">
    <Head>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.svg"></Link>
    </Head>
    <AppGrid />
    <GlobalMeta />
    <!-- <Landscape /> -->
    <SmoothScroll>
      <AppHeader :is-contact-page="isContactPage" />
      <NuxtLayout>
        <main class="app__main">
          <KeepAlive>
            <NuxtPage />
          </KeepAlive>
        </main>
        <Revealer />
        <Preloader v-if="isFirstLoad" />
        <AppFooter v-if="!isContactPage" />
      </NuxtLayout>
    </SmoothScroll>
    <ToastGroup />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
  white-space: pre-line;
}

.app__main {
  flex: 1;
}
</style>
