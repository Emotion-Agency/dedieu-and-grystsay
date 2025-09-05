import { gsap } from '~/libs/gsap'

export default class NavbarPos {
  scrollPos = 0
  mouseFunc: (e: MouseEvent) => void
  top = 0

  $sc = document.querySelector('#scroll-container')
  hovered = false

  init() {
    this.scrollPos = 0
    this.scrollNav = this.scrollNav.bind(this)

    gsap.ticker.add(this.scrollNav)
  }

  scrollNav() {
    this.top = -this.$sc?.scrollTop

    if (this.hovered) {
      return
    }

    this.isVisible && this.addVisibility()

    this.isHidden && this.removeVisibility()

    this.scrollPos = -this.$sc?.scrollTop
  }

  get isHidden() {
    return this.top < this.scrollPos && this.scrollPos < 0 && -this.top >= 0
  }

  get isVisible() {
    return this.top > this.scrollPos || this.isFixed
  }

  get isFixed() {
    return window.elenis ? window.elenis.isStopped : false
  }

  addVisibility() {
    document.body.classList.remove('nav-hidden')
  }

  removeVisibility() {
    document.body.classList.add('nav-hidden')
  }

  destroy() {
    this.scrollPos = 0
    gsap.ticker.remove(this.scrollNav)
  }
}
