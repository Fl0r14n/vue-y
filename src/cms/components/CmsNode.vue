<template>CmsNode</template>
<script setup lang="ts">
  import type { NavNodeData, NavNodeEntryData } from '@/api'

  interface CmsNodeData {
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

    active?: any // nav structure helper object
    title?: string
    children?: NavNodeData[]
    entries?: NavNodeEntryData[]
  }

  const props = defineProps<CmsNodeData>()
</script>
