<template>CmsProductCarousel</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface ProductCarouselComponentData extends ComponentData {
    popup?: string | boolean
    productCodes?: string
    scroll?: string
    title?: string
    //from ProductReferencesComponentWsDTO
    displayProductPrices?: boolean
    displayProductTitles?: boolean
    maximumNumberProducts?: number
  }

  const props = defineProps<ProductCarouselComponentData>()
</script>
