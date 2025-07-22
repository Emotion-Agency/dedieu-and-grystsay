import type { iNewsContent } from '~/types/newsTypes'
import { useGetStory } from '../getStory'
import type { iStory } from '~/types/story'

type tNewsStory = (slug: string) => Promise<{
  story: Ref<iStory<iNewsContent>>
}>

export const useNewsStory: tNewsStory = async (slug: string) => {
  const story = useState<iStory<iNewsContent>>(`${slug}Index`, () => null)

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
