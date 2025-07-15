<script setup lang="ts">
import { useFonts } from '~/composables/fonts'

useFonts()

onMounted(async () => {
  const { detectOrientationChanges } = await import(
    '~/utils/detectLandscapeOrientation'
  )

  detectOrientationChanges()
})

useHead({
  htmlAttrs: {
    lang: 'en',
    id: 'scroll-container',
  },
})
</script>

<template>
  <div id="app" class="app">
    <Head>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></Meta>
      <Link rel="icon" type="image/x-icon" href="/favicon.ico"></Link>
    </Head>
    <AppGrid />
    <!-- <Landscape /> -->
    <SmoothScroll>
      <NuxtLayout>
        <AppHeader />
        <main class="app__main">
          <NuxtPage />
        </main>
        <AppFooter />
      </NuxtLayout>
    </SmoothScroll>
    <ToastGroup />
  </div>
</template>

<style scoped lang="scss">
.app {
  min-height: 100vh;
}

.app__main {
  flex: 1;
}
</style>
