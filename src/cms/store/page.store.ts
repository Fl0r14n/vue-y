import type { CMSPageData } from '@/api'
import { FieldLevelMapping, PageType } from '@/api'
import { useComponentResource, usePageResource } from '@/api/cms'
import { useLocaleStore } from '@/cms'
import { useSmartEditStore } from '@/cms/store/smart-edit.store'
import { useCmsConfig } from '@/config'
import { useOAuth } from '@/oauth'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

export interface CmsPageQuery {
  id?: string
  pageType: PageType
  cmsTicketId?: string
}

export const usePageStore = defineStore('PageStore', () => {
  const cmsConfig = useCmsConfig()
  const pageResource = usePageResource()
  const componentResource = useComponentResource()
  const { status } = useOAuth()
  const { component } = storeToRefs(useSmartEditStore())
  const { language, currency } = storeToRefs(useLocaleStore())
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

  const getStaticPage = (query?: CmsPageQuery) => {
    const { pages } = cmsConfig.value || {}
    return (query?.id && pages?.[query.pageType]?.uids?.[query.id]) || undefined
  }

  watch([query, language, currency, status], async ([q]) => {
    if (q) {
      page.value = getStaticPage(q) || (await getPage(q))
    }
  })

  const getPage = (query?: CmsPageQuery) =>
    pageResource.getPages({
      fields: FieldLevelMapping.FULL,
      pageType: query?.pageType,
      pageLabelOrId: (query?.pageType === PageType.CONTENT && query.id) || undefined,
      code: (query?.pageType !== PageType.CONTENT && query?.id) || undefined,
      cmsTicketId: query?.cmsTicketId || undefined
    })

  watch(component, async comp => {
    if (!comp?.parentId) {
      // it is a slot so refresh page
      page.value = getStaticPage(query.value) || (await getPage(query.value))
    } else if (comp.componentType) {
      const nComp = await componentResource.getComponent(comp.componentId, {
        fields: FieldLevelMapping.FULL
      })
      const existing = page.value?.contentSlots?.contentSlot.flatMap(s => s.components?.component).find(c => c?.uid === comp.componentId)
      existing && Object.assign(existing, nComp)
    }
  })

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
