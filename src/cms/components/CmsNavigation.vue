<template>CmsNavigation</template>
<script setup lang="ts">
  import type { ComponentData, NavNodeData } from '@/api'

  export interface NavigationComponentData extends ComponentData {
    container?: boolean
    wrapAfter?: number
    styleClass?: string
    navigationNode?: NavNodeData
  }

  const props = defineProps<NavigationComponentData>()
</script>
