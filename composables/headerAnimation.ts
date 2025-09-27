import { gsap } from '~/libs/gsap'

export const useHeaderAnimation = () => {
  const elRef = useState<HTMLElement | null>('elRef', () => null)

  const init = (el: HTMLElement | null) => {
    elRef.value = el
  }

  const logoAnimation = () => {
    const $logo = elRef.value.querySelector('.dag-logo')

    const left = $logo.getBoundingClientRect().left
    const top = $logo.getBoundingClientRect().top

    const $emblem = $logo.querySelector('.dag-logo__emblem')
    const width = $emblem.getBoundingClientRect().width
    const height = $emblem.getBoundingClientRect().height
    const $bg = $logo.querySelector('.dag-logo__bg')

    const $line = $logo.querySelector('.dag-logo__emblem-line')

    const $clonedLine = $line.cloneNode(true) as HTMLElement

    $logo.appendChild($clonedLine)

    const lineLeft = $line.getBoundingClientRect().left
    const lineWidth = $line.getBoundingClientRect().width

    gsap.set($clonedLine, {
      position: 'fixed',
      zIndex: 51,
      top: 0,
      left: lineLeft,
      width: lineWidth,
      height: window.innerHeight,
    })

    const tl = gsap.timeline({
      defaults: {
        ease: 'power2.inOut',
      },
      onComplete: () => {
        $clonedLine.remove()
        $bg.remove()
        tl.revert()
      },
    })

    tl.from($clonedLine, {
      x: '100vw',
      duration: 2,
    })

    tl.to($bg, { duration: 1, width, height, left, top })
    return tl
  }

  const appear = async () => {
    return new Promise<void>(resolve => {
      const masterTl = gsap.timeline({
        onComplete: () => {
          resolve()
        },
      })

      const logoTl = logoAnimation()

      const $headerLine = elRef.value.querySelector('.header__line')
      const $headerItems = elRef.value.querySelectorAll('.navigation__link')
      const $headerItemsLines = elRef.value.querySelectorAll(
        '.navigation__link-divider'
      )
      const $langSwitcher = elRef.value.querySelector('.lang-switch')
      const $logoText = elRef.value.querySelectorAll('.dag-logo svg path')
      const $burger = elRef.value.querySelectorAll('.burger-menu__btn')

      const navbarTl = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
        onComplete: () => {
          gsap.set(
            [
              elRef.value,
              $headerLine,
              $headerItems,
              $headerItemsLines,
              $langSwitcher,
              $logoText,
              $burger,
            ],
            { clearProps: 'all' }
          )
        },
      })

      gsap.set($headerLine, {
        scaleX: 0,
        transformOrigin: 'left',
      })

      window.innerWidth > 860 &&
        gsap.set($headerItemsLines, {
          scaleY: 0,
          transformOrigin: 'bottom',
        })

      window.innerWidth > 860 &&
        gsap.set($headerItems, { yPercent: 100, clipPath: 'inset(0 0 110% 0)' })

      gsap.set($langSwitcher, { opacity: 0 })
      gsap.set($logoText, {
        opacity: 0,
      })

      window.innerWidth <= 860 &&
        gsap.set($burger, {
          opacity: 0,
        })

      navbarTl.to($logoText, { opacity: 1, duration: 1, stagger: 0.03 })
      navbarTl.to(
        $headerLine,
        { scaleX: 1, duration: 1, ease: 'sine.inOut' },
        '<'
      )
      window.innerWidth > 860 &&
        navbarTl.to(
          $headerItemsLines,
          {
            scaleY: 1,
            stagger: 0.1,
            duration: 0.5,
          },
          '<'
        )
      window.innerWidth > 860 &&
        navbarTl.to(
          $headerItems,
          {
            yPercent: 0,
            clipPath: 'inset(0 0 -110% 0)',
            stagger: 0.05,
            duration: 1,
          },
          '<40%'
        )

      window.innerWidth <= 860 &&
        navbarTl.to(
          $burger,
          {
            opacity: 1,
            duration: 1,
          },
          '<40%'
        )

      navbarTl.to(
        $langSwitcher,
        {
          opacity: 1,
          duration: 1,
        },
        '<25%'
      )

      masterTl.add(logoTl, 0)
      masterTl.add(navbarTl, '<90%')
    })
  }

  return {
    init,
    appear,
  }
}
