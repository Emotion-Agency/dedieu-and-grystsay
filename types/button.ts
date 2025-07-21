export interface IButton {
  tag?: string
  type?: 'button' | 'submit' | 'reset' | null
  href?: string
  variant?: 'light' | 'dark'
  disabled?: boolean
  isReversed?: boolean
}
