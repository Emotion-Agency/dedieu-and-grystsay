import type { iImage, iMeta } from './story'

export interface iNewsContent {
  body: any
  meta: iMeta[]
  component: string
  title: string
  preview: iImage
  description: string
  _uid: string
}

export interface iNewsHero {
  asset: iImage
  title: string
  mobile_title?: string
  component: string
  _uid: string
}

export interface iNewsTicker {
  text: string
  component: string
  _uid: string
}

export interface iNewsGrid {
  button: string
  component: string
  _uid: string
}
