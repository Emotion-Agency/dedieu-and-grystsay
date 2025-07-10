import type { iImage, iMeta } from './story'

export interface iProjectsContent {
  body: any
  meta: iMeta[]
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

export interface iProjectsGrid {
  button: string
  component: string
  _uid: string
}

export interface iProjectsCurrentProjects {
  marquee_title: string
  projects: any
  component: string
  _uid: string
}
