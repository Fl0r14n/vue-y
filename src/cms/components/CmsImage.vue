<template>
  <template v-if="media"> </template>
</template>
<script setup lang="ts">
  import type { MediaData } from '@/api'

  export interface ImageComponentData {
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

    media?: MediaData
    external?: string | boolean
    urlLink?: string
    altText?: string
  }

  const props = defineProps<ImageComponentData>()
</script>
