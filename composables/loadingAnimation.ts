import { delayPromise } from '@emotionagency/utils'
import { gsap, SplitText } from '~/libs/gsap'

export const useLoadingAnimation = () => {
  const { appear } = useHeaderAnimation()
  const isFirstLoad = useState('isFirstLoad', () => true)

  const getElements = (parent?: HTMLElement) => {
    const $el = parent || document

    const $image = $el.querySelectorAll('[data-preload]')
    const $split = $el.querySelectorAll('[data-split]')
    const $logo = $el.querySelector('.dag-logo')
    const $t = $el.querySelectorAll('[data-t]')
    const $o = $el.querySelectorAll('[data-o]')
    const $scale = $el.querySelectorAll('[data-scale]')
    return { $image, $split, $logo, $t, $o, $scale }
  }

  const animate = async (parent?: HTMLElement, wait = 0.2) => {
    return new Promise<void>(resolve => {
      ;(async () => {
        await document.fonts.ready
        document.documentElement.style.cursor = 'wait'
        document.body.style.pointerEvents = 'none'

        const { $image, $split, $logo, $t, $o, $scale } = getElements(parent)
        await delayPromise(200)

        if (isFirstLoad.value && $logo) {
          appear()
        }

        const delay = isFirstLoad.value ? 3.2 : wait

        const onComplete = () => {
          titleSplitter?.revert()
          tl.revert()

          document.documentElement.style.cursor = 'auto'
          document.body.style.pointerEvents = 'auto'
        }

        const tl = gsap.timeline()

        if ($image) {
          tl.set($image, {
            opacity: 0,
            clipPath: 'inset(10%)',
          })
        }

        tl.set($t, { opacity: 0, y: 50 })
        tl.set($o, { opacity: 0 })
        tl.set($scale, { opacity: 0, scale: 0.6 })

        // Animate image resize
        if ($image?.length) {
          tl.to(
            $image,
            {
              duration: 1.6,
              opacity: 1,
              clipPath: 'inset(0%)',
              stagger: 0.1,
              ease: 'power2.out',
            },
            delay
          )
        }

        let titleSplitter: SplitText

        if ($split) {
          titleSplitter = new SplitText($split, {
            type: 'lines',
            mask: 'lines',
            onSplit: target => {
              gsap.set(target.lines, { yPercent: 110 })

              tl.to(
                target.lines,
                {
                  duration: 1.5,
                  yPercent: 0,
                  stagger: 0.1,
                  opacity: 1,
                  ease: 'power2.out',
                  // overwrite: true,
                },
                delay
              )
            },
          })
        }

        if ($t.length) {
          tl.to(
            $t,
            {
              duration: 1.3,
              opacity: 1,
              y: 0,
              stagger: 0.2,
              ease: 'power2.out',
            },
            '<0.2'
          )
        }

        if ($scale.length) {
          tl.to(
            $scale,
            {
              opacity: 1,
              scale: 1,
              duration: 2,
              ease: 'power2.out',
            },
            '<0.5'
          )
        }

        if ($o.length) {
          tl.to(
            $o,
            {
              duration: 1.6,
              opacity: 1,
              stagger: 0.2,
              ease: 'power2.out',
            },
            '<1'
          )
        }

        isFirstLoad.value = false

        // const treshold = $o.length ? 1200 : 300

        const dur = tl.duration() * 1000

        setTimeout(() => {
          onComplete()
          resolve()
        }, dur)
      })()
    })
  }

  return {
    isFirstLoad,
    init: animate,
  }
}
