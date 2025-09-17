<script setup lang="ts">
import imagesLoaded from 'imagesloaded'
import { useFonts } from '~/composables/fonts'

useFonts()

const { isInEditor } = useAppState()

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

  if (isInEditor.value) {
    isFirstLoad.value = false
    return
  }

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
const { locale } = useI18n()

const cleanPath = computed(() => normalizePath(route.path, locale.value))

const isMainPage = computed(
  () => cleanPath.value === '/' || cleanPath.value === '/index'
)
const isContactPage = computed(() => cleanPath.value.includes('/contact'))
const isAboutPage = computed(() => cleanPath.value.includes('/about'))
const isNewsPage = computed(() => cleanPath.value === '/news')
const isCurrentNewsPage = computed(() => cleanPath.value.startsWith('/news/'))
const isProjectsPage = computed(() => cleanPath.value === '/projects')
const isCurrentProjectPage = computed(() =>
  cleanPath.value.startsWith('/projects/')
)
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
        <AppFooter
          v-if="!isContactPage"
          :class="{
            'app__footer--main': isMainPage,
            'app__footer--about': isAboutPage,
            'app__footer--news': isNewsPage,
            'app__footer--current-news': isCurrentNewsPage,
            'app__footer--projects': isProjectsPage,
            'app__footer--current-project': isCurrentProjectPage,
          }"
        />
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

.app__footer {
  &--main {
    padding-top: vw(142);

    @media (max-width: $br1) {
      padding-top: 120px;
    }
  }

  &--about {
    padding-top: vw(76);

    @media (max-width: $br1) {
      padding-top: 100px;
    }
  }

  &--projects {
    padding-top: vw(138);

    @media (max-width: $br1) {
      padding-top: 100px;
    }
  }

  &--current-project {
    padding-top: vw(110);

    @media (max-width: $br1) {
      padding-top: 88px;
    }
  }

  &--news {
    padding-top: vw(134);

    @media (max-width: $br1) {
      padding-top: 100px;
    }
  }

  &--current-news {
    padding-top: vw(190);

    @media (max-width: $br1) {
      padding-top: 100px;
    }
  }
}
</style>
