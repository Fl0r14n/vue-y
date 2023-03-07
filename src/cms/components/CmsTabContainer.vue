<template>CmsTabContainer</template>
<script setup lang="ts">
  export interface TabContainerComponentData {
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

    components: string
  }

  const props = defineProps<TabContainerComponentData>()
</script>
