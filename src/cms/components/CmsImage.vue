<template>CmsImage</template>
<script setup lang="ts">
  import type { ComponentData, MediaData } from '@/api'

  export interface ImageComponentData extends ComponentData {
    media?: MediaData
    external?: string | boolean
    urlLink?: string
    altText?: string
  }

  const props = defineProps<ImageComponentData>()
</script>
