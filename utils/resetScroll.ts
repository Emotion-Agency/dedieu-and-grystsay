import { ScrollTrigger } from '~/libs/gsap'

export const resetScroll = () => {
  setTimeout(() => {
    window?.scrollTo(0, 0)
    window?.elenis?.scrollTo(0, {
      immediate: true,
      force: true,
    })
    window?.elenis?.start()
    ScrollTrigger.refresh()
  }, 0)
}
