import { ScrollTrigger } from '~/libs/gsap'

export const resetScroll = () => {
  history && (history.scrollRestoration = 'manual')
  window?.scrollTo(0, 0)
  window?.elenis?.scrollTo(0, {
    immediate: true,
    force: true,
  })
  window?.elenis?.start()
  ScrollTrigger.refresh()
}
