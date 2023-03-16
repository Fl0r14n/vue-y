<template>MiniCart</template>
<script setup lang="ts">
  import { MediaContainerData } from '@/api'

  interface MiniCartData {
    uid?: string
    uuid?: string
    typeCode?: string
    creationtime?: string
    modifiedtime?: string
    styleClasses?: string
    properties?: object
    name?: string
    shownProductCount?: string
    container?: string
    totalDisplay?: string
    synchronizationBlocked?: string
    title?: string
    lightboxBannerComponent?: {
      container?: string | boolean
      properties?: object
      name?: string
      typeCode?: string
      uid?: string
      uuid?: string
      creationtime?: string | Date
      modifiedtime?: string | Date
      synchronizationBlocked?: any
      styleClasses?: string

      media?: MediaContainerData
      urlLink?: string
    }
  }

  defineProps<MiniCartData>()
</script>
