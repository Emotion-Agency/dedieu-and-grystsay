import type { iImage, iMeta } from './story'

export interface iHomeContent {
  body: any
  meta: iMeta[]
}

export interface iHomeHero {
  title: string
  text: string
  asset: iImage
  component: string
  _uid: string
}

export interface iHomeTicker {
  text: string
  component: string
  _uid: string
}
