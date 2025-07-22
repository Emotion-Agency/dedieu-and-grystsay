import type { iProjectContent } from '~/types/projectsTypes'
import { useGetStory } from '../getStory'
import type { iStory } from '~/types/story'

type tProjectsStory = (slug: string) => Promise<{
  story: Ref<iStory<iProjectContent>>
}>

export const useProjectsStory: tProjectsStory = async (slug: string) => {
  const story = useState<iStory<iProjectContent>>(`${slug}Index`, () => null)

  try {
    if (!story.value) {
      const res = await useGetStory(slug)

      story.value = res.value
    }
  } catch (error) {
    console.log(error)
  }

  if (import.meta.client) {
    useStoryblokBridge(story.value?.id, evStory => {
      story.value = evStory as unknown as iStory
    })
  }

  return { story }
}
