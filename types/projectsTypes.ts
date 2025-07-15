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
  body: any
  meta: iMeta[]
  component: string
  _uid: string
}

export interface iCurrentProjectsContent {
  marquee_title: string
  projects: iCurrentProjects[]
  component: string
  _uid: string
}

export interface iCurrentProjects {
  content: {
    items: iCurrentProject[]
    component: string
    _uid: string
  }
}

export interface iCurrentProject {
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

export interface iProjectsCurrentProjects {
  marquee_title: string
  projects: iCurrentProjects
  component: string
  _uid: string
}
