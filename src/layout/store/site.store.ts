import { FieldLevelMapping, useSiteConfig } from '@/api'
import type { BaseSiteData } from '@/api'
import { useBaseSiteResource } from '@/api/base'
import { useOAuth } from '@/oauth'
import { ref, watch } from 'vue'
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
  const oauth = useOAuth()
  const site = useSiteConfig()
  const siteResource = useBaseSiteResource()
  console.log(siteResource)
  const sites = ref<BaseSiteData[]>([])
  if (!site.value?.uid) {
    sites.value = await siteResource.getBaseSites({ fields: FieldLevelMapping.FULL }).then(r => r.baseSites)
    site.value = findBaseSite(sites.value)
    console.log(site.value)
    if (site.value?.uid) {
      next()
    }
  } else {
    oauth.storageKey.value = `${site.value.uid}.token`
    return next()
  }
}

export const useSiteStore = () => {
  const oauth = useOAuth()
  const site = useSiteConfig()
  const siteResource = useBaseSiteResource()
  console.log(siteResource)
  const sites = ref<BaseSiteData[]>([])
  const router = useRouter()
  const updateRouter = () => {
    let buf = ''
    const { urlEncodingAttributes } = site.value || {}
    if (urlEncodingAttributes) {
      for (const attr of urlEncodingAttributes) {
        buf += `:${attr}/`
      }
      buf = buf.slice(0, -1)
    }
    // router.remove
    // router.addRoute({ name: 'layout', path: buf } as any)
    // router.removeRoute('layout')
    console.log(router.getRoutes())
  }

  // watch(
  //   () => site.value?.uid,
  //   async uid => {
  //     if (!uid) {
  //       sites.value = await siteResource.getBaseSites({ fields: FieldLevelMapping.FULL }).then(r => r.baseSites)
  //       site.value = findBaseSite(sites.value)
  //       console.log(site.value)
  //       updateRouter()
  //     } else {
  //       oauth.storageKey.value = `${uid}.token`
  //     }
  //   },
  //   { immediate: true }
  // )

  return {
    site,
    sites
  }
}
