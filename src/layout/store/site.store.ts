import type { BaseSiteData } from '@/api'
import { FieldLevelMapping, useSiteConfig } from '@/api'
import { useBaseSiteResource } from '@/api/base'
import { useOAuth } from '@/oauth'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const toRegExp = (value: string): RegExp | undefined => {
  const match = value.match(/^(\(\?([a-z]+)\))?(.*)/)
  if (match) {
    const [, , flags, pattern] = match
    return new RegExp(pattern, flags)
  }
  console.warn(`${value} is not a valid URL pattern`)
  return undefined
}

const findBaseSite = (baseSites: BaseSiteData[]) => {
  const { href } = location
  for (const baseSite of baseSites) {
    if (baseSite.urlPatterns) {
      for (const urlPattern of baseSite.urlPatterns) {
        try {
          const re = toRegExp(urlPattern)
          if (re?.test(href.toString())) {
            return baseSite
          }
        } catch (_) {
          /* empty */
        }
      }
    }
  }
  console.warn(`No URL pattern found for ${href} in base sites`)
  return undefined
}

export const siteGuard = async (to: any, from: any, next: any) => {
  const siteStore = useSiteStore()
  console.log(siteStore)
  const { loadSites } = siteStore
  const { siteId } = storeToRefs(siteStore)
  if (!siteId.value) {
    await loadSites()
    if (siteId.value) {
      next()
    }
  } else {
    return next()
  }
}

export const useSiteStore = defineStore('SiteStore', () => {
  const oauth = useOAuth()
  const site = useSiteConfig()
  const sites = ref<BaseSiteData[]>([])
  const siteResource = useBaseSiteResource()
  const siteId = computed(() => site.value?.uid)
  // const router = useRouter()
  const loadSites = async () => {
    sites.value = await siteResource.getBaseSites({ fields: FieldLevelMapping.FULL }).then(r => r.baseSites)
    site.value = findBaseSite(sites.value)
  }

  const updateRouter = () => {
    let buf = ''
    const { urlEncodingAttributes } = site.value || {}
    if (urlEncodingAttributes) {
      for (const attr of urlEncodingAttributes) {
        buf += `:${attr}/`
      }
      buf = buf.slice(0, -1)
    }
    console.log(buf)
    // router.remove
    // router.addRoute({ name: 'layout', path: buf } as any)
    // router.removeRoute('layout')
    // console.log(router.getRoutes())
  }

  watch(
    () => site.value?.uid,
    uid => {
      if (uid) {
        oauth.storageKey.value = `${uid}.token`
        updateRouter()
      }
    },
    { immediate: true }
  )

  return {
    site,
    siteId,
    sites,
    loadSites
  }
})
