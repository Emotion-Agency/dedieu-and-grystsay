import type { iImage, iMeta } from './story'

export interface iAboutContent {
  body: any
  meta: iMeta[]
}

export interface iAboutHero {
  assets: iImage[]
  component: string
  _uid: string
}

export interface iAboutTicker {
  text: string
  component: string
  _uid: string
}

export interface iAboutTextBlock {
  size: string
  text: string
  title: string
  component: string
  _uid: string
}
