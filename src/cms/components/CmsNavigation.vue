<template>CmsNavigation</template>
<script setup lang="ts">
  import type { NavNodeData } from '@/api'

  export interface NavigationComponentData {
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string
    creationtime?: string | Date
    modifiedtime?: string | Date
    synchronizationBlocked?: any
    styleClasses?: string

    container?: boolean
    wrapAfter?: number
    styleClass?: string
    navigationNode?: NavNodeData
  }

  const props = defineProps<NavigationComponentData>()
</script>
