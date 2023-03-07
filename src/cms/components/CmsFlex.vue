<template>
  <component :is="getComponent(flexType, uid)" v-bind="props" />
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'

  export interface FlexComponentData {
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
    flexType: string
  }

  const props = defineProps<FlexComponentData>()
</script>
