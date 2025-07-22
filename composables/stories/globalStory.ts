import type { iGlobalContent } from '~/types/globalTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tGlobalStory = () => Promise<{
  story: Ref<iStory<iGlobalContent>>
}>

export const useGlobalStory: tGlobalStory = async () => {
  const story = useState<iStory<iGlobalContent>>('global', () => null)

  try {
    if (!story.value) {
      const res = await useGetStory('global')

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
