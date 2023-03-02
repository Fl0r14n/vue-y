import type { BaseSiteData } from '@/api'
import { FieldLevelMapping } from '@/api'
import { useBaseSiteResource } from '@/api/base'
import { useRouter } from '@/cms'
import { useSiteConfig } from '@/config'
import { useOAuth } from '@/oauth'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

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
  const { loadSites, updateRouter } = siteStore
  const { siteId } = storeToRefs(siteStore)
  if (!siteId.value) {
    await loadSites()
    if (siteId.value) {
      next(updateRouter(to, from))
    }
  } else {
    return next(updateRouter(to, from))
  }
}

export const useSiteStore = defineStore('SiteStore', () => {
  const oauth = useOAuth()
  const site = useSiteConfig()
  const sites = ref<BaseSiteData[]>([])
  const siteResource = useBaseSiteResource()
  const siteId = computed(() => site.value?.uid)
  const siteSuffix = computed(() => {
    let buf = '/'
    const { urlEncodingAttributes } = site.value || {}
    if (urlEncodingAttributes) {
      for (const attr of urlEncodingAttributes) {
        buf += `:${attr}/`
      }
      buf = buf.slice(0, -1)
    }
    return buf
  })
  const router = useRouter()
  const loadSites = async () => {
    sites.value = await siteResource.getBaseSites({ fields: FieldLevelMapping.FULL }).then(r => r.baseSites)
    site.value = findBaseSite(sites.value)
  }

  const updateRouter = (to?: any, from?: any) => {
    const { value } = siteSuffix
    const routes = router.getRoutes()
    const hasSuffix = routes.find(r => r.path.startsWith(value))
    if (!hasSuffix) {
      const newRoutes = routes.map(r => ({ ...r, ...{ path: `${siteSuffix.value}${r.path}` } }))
      newRoutes.forEach(r => router.addRoute(r))
      return (from.path !== to.path && to) || undefined
    }
  }

  watch(
    () => site.value?.uid,
    uid => {
      if (uid) {
        oauth.storageKey.value = `${uid}.token`
      }
    },
    { immediate: true }
  )

  return {
    site,
    siteId,
    sites,
    loadSites,
    updateRouter
  }
})
