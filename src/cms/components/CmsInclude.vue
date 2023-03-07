<template>
  <component :is="getComponent(typeCode, uid)" />
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'

  export interface JspIncludeComponentData {
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

    page?: string
    title?: string
  }

  const props = defineProps<JspIncludeComponentData>()
</script>
