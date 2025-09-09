import type { iImage, iMeta } from './story'

export interface iProjectContent {
  body: any
  meta: iMeta[]
  component: string
  _uid: string
}

export interface iProjectsContent {
  title: string
  description: string
  preview: iImage
  body: any[]
  meta: iMeta[]
  component: string
  _uid: string
}

export interface iCurrentNewsContent {
  marquee_title: string
  news?: iCurrentAllNews[]
  projects?: iCurrentAllNews[]
  component: string
  _uid: string
}

export interface iCurrentAllNews {
  content: {
    items: iCurrentNews[]
    component: string
    _uid: string
  }
}

export interface iCurrentNews {
  asset: iImage
  text: string
  title: string
  component: string
  _uid: string
}

export interface iProjectsHero {
  asset: iImage
  text: string
  title: string
  component: string
  _uid: string
}

export interface iProjectsTicker {
  text: string
  component: string
  _uid: string
}

export interface iProjectsGrid {
  button: string
  component: string
  _uid: string
}
