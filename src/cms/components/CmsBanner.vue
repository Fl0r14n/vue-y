<template>
  <div>HEllo CmsBanner</div>
</template>
<script setup lang="ts">
  import type { ComponentData, MediaContainerData } from '@/api'

  interface BannerComponentData extends ComponentData {
    media?: MediaContainerData
    urlLink?: string
  }

  const props = defineProps<BannerComponentData>()
</script>
