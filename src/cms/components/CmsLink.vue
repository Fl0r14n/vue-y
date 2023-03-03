<template>CmsLink</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface LinkComponentData extends ComponentData {
    contentPage?: string
    contentPageLabelOrId?: string
    external?: string | boolean
    linkName?: string
    target?: string | boolean
    url?: string
  }

  const props = defineProps<LinkComponentData>()
</script>
