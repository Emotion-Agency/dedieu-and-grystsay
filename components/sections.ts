import HeroV1 from './home/HeroSection.vue'
import HeroV2 from '~/components/current-project/HeroSection.vue'
import HeroV3 from '~/components/projects/ProjectsHero.vue'
import HeroV4 from '~/components/news/NewsHero.vue'
import HeroV5 from '~/components/current-news/HeroSection.vue'

import Ticker from './Ticker.vue'
import ProjectsCarousel from './home/ProjectsCarousel.vue'
import AllProjects from './home/AllProjects.vue'
import WhoAreWe from './home/WhoAreWe.vue'
import AppCurrentNews from './AppCurrentNews.vue'
import ProjectsGrid from './projects/ProjectsGrid.vue'
import FullPageAssetsSection from './current-project/FullPageAssetsSection.vue'
import AssetTextSection from './current-project/AssetTextSection.vue'
import ConceptSection from './current-project/concept/ConceptSection.vue'
import Divider from './Divider.vue'
import VisionSection from './current-news/VisionSection.vue'
import TextBlockSection from './about/TextBlockSection.vue'

export const blockSections = {
  hero_v1: HeroV1,
  hero_v2: HeroV2,
  hero_v3: HeroV3,
  hero_v4: HeroV4,
  hero_v5: HeroV5,
  marquee: Ticker,
  projects_carousel: ProjectsCarousel,
  all_projects: AllProjects,
  who_are_we: WhoAreWe,
  current_all_news: AppCurrentNews,
  full_page_assets: FullPageAssetsSection,
  projects_grid: ProjectsGrid,
  asset_text_section: AssetTextSection,
  concept: ConceptSection,
  divider: Divider,
  vision: VisionSection,
  text_block: TextBlockSection,
  current_projects: AppCurrentNews,
}
