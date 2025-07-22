import type { iProjectsContent } from './projectsTypes'
import type { iImage, iLink, iMeta, iStory } from './story'

export interface iHomeContent {
  body: any
  meta: iMeta[]
}

export interface iHomeImages {
  assets: iImage[]
  component: string
  _uid: string
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

export interface iHomeProjectsCarousel {
  button_text: string
  back_button_text: string
  hover_text: string
  projects: iStory<iProjectsContent>[]
  component: string
  _uid: string
}

export interface iHomeAllProjects {
  assets: iHomeImages[]
  label: string
  component: string
  _uid: string
}

export interface iHomeWhoAreWe {
  assets: iImage[]
  link: iWhoAreLink[]
  subtitle: string
  text: string
  title: string
  component: string
  _uid: string
}

export interface iWhoAreLink {
  icon: iImage
  label: string
  url: iLink
  component: string
  _uid: string
}
