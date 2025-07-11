import type { iImage, iMeta } from './story'

export interface iNewsContent {
  body: any
  meta: iMeta[]
  component: string
  _uid: string
}

export interface iNewsHero {
  asset: iImage
  title: string
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

export interface iNewsCurrentProjects {
  marquee_title: string
  projects: any
  component: string
  _uid: string
}
