import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
const RECIPROCAL_GR = 1 / GOLDEN_RATIO
const DURATION = RECIPROCAL_GR

if (globalThis.document) {
  gsap.registerPlugin(Flip, ScrollTrigger, SplitText)

  gsap.config({
    nullTargetWarn: false,
  })

  gsap.defaults({
    duration: DURATION,
    ease: 'power2.out',
  })

  ScrollTrigger.defaults({
    pinType: 'fixed',
  })

  gsap.ticker.lagSmoothing(0)
}

export { Flip, ScrollTrigger, SplitText, DURATION, GOLDEN_RATIO, gsap }
