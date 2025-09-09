import type { iGridItems } from '~/types/gridTypes'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

export const findProjectTitle = (
  item: iStory<iProjectsContent> | iStory<iGridItems>
) => {
  return item?.content?.body?.find(block => block.component.includes('hero'))
    ?.title
}
