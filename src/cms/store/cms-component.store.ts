import type { ComponentData } from '@/api'
import { useComponentResource } from '@/api/cms'
import { useCacheConfig } from '@/config'
import { defineStore } from 'pinia'

export const useCmsComponentStore = defineStore('CmsComponentStore', () => {
  const componentResource = useComponentResource()
  const cacheConfig = useCacheConfig()
  const getKey = (componentIds: string[]) => componentIds.join(',')
  const get = (componentIds: string[]) => cacheConfig.value?.components?.[getKey(componentIds)]
  const set = (componentIds: string[], value: ComponentData[]) => {
    const { components } = cacheConfig.value || {}
    if (components) {
      components[getKey(componentIds)] = value
    }
  }
  const search = async (componentIds: string[]) => {
    let result = get(componentIds)
    if (!result?.length) {
      result = await componentResource.search({ componentIds, pageSize: 100 }).then(r => r.component)
      if (result?.length) {
        set(componentIds, result)
      }
    }
    return result
  }
  return { search }
})
