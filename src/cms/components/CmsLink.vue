<template>CmsLink</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface LinkComponentData {
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

    contentPage?: string
    contentPageLabelOrId?: string
    external?: string | boolean
    linkName?: string
    target?: string | boolean
    url?: string
  }

  const props = defineProps<LinkComponentData>()
</script>
