<template>CmsProductCarousel</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface ProductCarouselComponentData {
    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string

    creationtime?: string | Date
    modifiedtime?: string | Date

    synchronizationBlocked?: any

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
