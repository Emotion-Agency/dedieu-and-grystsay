import type { iCompanyContactContent } from '~/types/companyContactTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tCompanyContactStory = () => Promise<{
  story: Ref<iStory<iCompanyContactContent>>
}>

export const useCompanyContactStory: tCompanyContactStory = async () => {
  const story = useState<iStory<iCompanyContactContent>>(
    'components/company-contact',
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory('components/company-contact')

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
