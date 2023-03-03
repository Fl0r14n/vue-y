<template>CmsInclude</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface JspIncludeComponentData extends ComponentData {
    page?: string
    title?: string
  }

  const props = defineProps<JspIncludeComponentData>()
</script>
