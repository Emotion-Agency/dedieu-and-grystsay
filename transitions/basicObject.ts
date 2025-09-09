interface IBasicObject {
  mode: 'out-in' | 'in-out' | 'default'
  css: boolean
  appear: boolean
  onEnter: () => void
  onLeave: () => void
}

export const basicObject: IBasicObject = {
  mode: 'out-in',
  css: false,
  appear: true,
  onEnter() {
    document.documentElement.style.cursor = 'auto'
    document.body.style.pointerEvents = 'auto'
  },
  onLeave() {
    window.elenis?.stop()

    document.documentElement.style.cursor = 'wait'
    document.body.style.pointerEvents = 'none'
  },
}
