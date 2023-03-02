import type { CMSPageData } from '@/api'
import { FieldLevelMapping, PageType } from '@/api'
import { usePageResource } from '@/api/cms'
import { useLocaleStore } from '@/cms'
import { useCmsConfig } from '@/config'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface CmsPageQuery {
  id?: string
  pageType: PageType
  cmsTicketId?: string
}

export const usePageStore = defineStore('PageStore', () => {
  const cmsConfig = useCmsConfig()
  const pageResource = usePageResource()
  const locale = useLocaleStore()
  const query = ref<CmsPageQuery>()
  const page = ref<CMSPageData>()
  const uid = computed(() => page.value?.uid)
  const title = computed(() => page.value?.title)
  const keywords = computed(() => page.value?.keywords)
  const description = computed(() => page.value?.description)
  const robots = computed(() => page.value?.robotTag)
  const properties = computed(() => page.value?.properties)
  const template = computed(() => page.value?.template)
  const type = computed(() => page.value?.typeCode)
  const slots = computed(() => page.value?.contentSlots)

  const getStaticPage = (query: CmsPageQuery) => {
    const { pages } = cmsConfig.value || {}
    return (query.id && pages?.[query.pageType]?.uids?.[query.id]) || undefined
  }

  watch(
    () => query.value,
    async q => {
      if (q) {
        page.value =
          getStaticPage(q) ||
          (await pageResource.getPages({
            fields: FieldLevelMapping.FULL,
            pageType: q.pageType,
            pageLabelOrId: (q.pageType === PageType.CONTENT && q.id) || undefined,
            code: (q.pageType !== PageType.CONTENT && q.id) || undefined,
            cmsTicketId: (q.cmsTicketId && q.cmsTicketId) || undefined
          }))
      }
    }
  )

  return {
    query,
    page,
    uid,
    title,
    keywords,
    description,
    robots,
    properties,
    template,
    type,
    slots
  }
})
