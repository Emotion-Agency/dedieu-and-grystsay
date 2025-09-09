import { ScrollTrigger } from '~/libs/gsap'

export const resetScroll = () => {
  window?.scrollTo(0, 0)
  window?.elenis?.scrollTo(0, {
    immediate: true,
    force: true,
  })
  window?.elenis?.start()
  ScrollTrigger.refresh()
}
