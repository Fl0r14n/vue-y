import { useLocaleStore } from '@/cms'
import { useApiConfig } from '@/config'

const isHttp = new RegExp('^(http|https)://', 'i')

export const hostPipe = (value?: string) => {
  const apiConfig = useApiConfig()
  if (apiConfig.value?.host && value && !isHttp.test(value)) {
    return `${apiConfig.value.host}${value}`
  }
  return value || ''
}

export const routerPath = (value?: string) => {
  const { basePath } = useLocaleStore()
  if (value && !isHttp.test(value)) {
    return `${basePath}${value}`
  }
  return value || ''
}
