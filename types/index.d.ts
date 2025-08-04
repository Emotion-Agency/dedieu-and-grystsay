import type Lenis from 'lenis'

export {}

declare global {
  interface Window {
    elenis: typeof Lenis.prototype
  }
}
