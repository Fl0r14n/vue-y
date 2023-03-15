import { useSiteStore } from '@/cms'
import { storeToRefs } from 'pinia'

export const themePipe = (value?: string) => {
  const { site } = storeToRefs(useSiteStore())
  const { theme } = site.value || {}
  return `${value || ''} ${theme ? 'theme-' + theme : ''}`
}

export const sitePipe = (value?: string) => {
  const { site } = storeToRefs(useSiteStore())
  const { uid } = site.value || {}
  return `${value || ''} ${uid ? 'site-' + uid : ''}`
}
