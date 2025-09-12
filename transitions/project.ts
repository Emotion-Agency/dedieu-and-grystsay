import type { TransitionProps } from 'vue'
import { gsap } from '../libs/gsap'
import { basicObject } from './basicObject'

const duration = 1
const ease = 'power2.inOut'

export const projectTransition: TransitionProps = {
  mode: 'out-in',
  onEnter(el, done) {
    const { init } = useLoadingAnimation()

    const revealer = document.querySelector('.revealer') as HTMLElement
    if (!revealer) {
      done()
      return
    }

    const tl = gsap.timeline({
      defaults: {
        duration,
        ease,
      },
      onComplete: () => {
        done()

        tl.revert()
        tl.kill()

        revealer.style.display = 'none'
      },
    })
    tl.to(revealer, {
      clipPath: 'inset(0 0 100% 0)',
    })

    tl.fromTo(
      el,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0.3
    )

    basicObject.onEnter()

    init()
  },
  async onLeave(el, done) {
    const revealer = document.querySelector('.revealer') as HTMLElement

    const $nextBtn = el.querySelector('.next-btn')

    if (!$nextBtn) {
      done()
    }

    const nextBtnBounds = $nextBtn.getBoundingClientRect()

    if (!revealer) {
      done()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        done()
        resetScroll()

        tl.revert()

        gsap.set(revealer, {
          clipPath: 'inset(0% 0 0 0)',
          display: 'block',
          opacity: 1,
        })
      },
      defaults: {
        duration,
        ease,
      },
    })

    tl.set(revealer, {
      width: nextBtnBounds.width,
      height: nextBtnBounds.height,
      borderRadius: '50%',
      top: nextBtnBounds.top,
      left: nextBtnBounds.left,
      transformOrigin: 'center, center',
      display: 'block',
      opacity: 1,
    })

    const aspectRatio = window.innerWidth / window.innerHeight

    const biggestSide = aspectRatio > 1 ? window.innerWidth : window.innerHeight

    const scaleRate = biggestSide / nextBtnBounds.width + 2

    tl.to(
      revealer,
      {
        scale: scaleRate,
      },
      0.1
    )

    basicObject.onLeave()
  },
}
