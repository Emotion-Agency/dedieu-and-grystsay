import type { iImage, iMeta } from './story'

export interface iProjectsContent {
  body: any
  meta: iMeta[]
  component: string
  _uid: string
}

export interface iCurrentProjects {
  items: iCurrentProject[]
  component: string
  _uid: string
}

export interface iCurrentProject {
  asset: iImage
  text: string
  title: string
  component: string
  _uid: string
}

export interface iProjects {
  content: {
    body: any
    description: string
    title: string
    component: string
    _uid: string
  }
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
