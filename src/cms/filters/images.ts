import type { ImageData, MediaContainerData, ProductData } from '@/api'
import { hostPipe } from '@/cms'
import { useMediaConfig } from '@/config'
import { computed } from 'vue'

export const productImagePipe = (product?: ProductData) => {
  const mediaConfig = useMediaConfig()
  return hostPipe(product?.images?.find(i => i.format === 'product')?.url) || mediaConfig.value?.missingImage || ''
}

export const productThumbnailPipe = (product?: ProductData) => {
  const mediaConfig = useMediaConfig()
  return hostPipe(product?.images?.find(i => i.format === 'thumbnail')?.url) || mediaConfig.value?.missingImage || ''
}

export const mediaSrcSetPipe = (media?: MediaContainerData) => {
  const mediaConfig = useMediaConfig()
  const breakpoints = computed(() => mediaConfig.value?.breakpoints)
  return (
    media &&
    Object.keys(media)
      .map(format => `${hostPipe(media?.[format].url)} ${breakpoints.value?.[format]}`)
      .reduce((prev, curr) => `${prev}, ${curr}`)
  )
}

export const imageSrcSetPipe = (images?: ImageData[], imageType?: string) => {
  const mediaConfig = useMediaConfig()
  const breakpoints = computed(() => mediaConfig.value?.breakpoints)
  const filtered = images?.filter(i => !!i.format && i.imageType === (imageType || 'PRIMARY')) || images || []
  return filtered.map(i => `${hostPipe(i.url)} ${breakpoints.value?.[i.format || '']}`).reduce((prev, curr) => `${prev}, ${curr}`)
}
