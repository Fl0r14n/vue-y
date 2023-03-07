<template>CmsParagraph</template>
<script setup lang="ts">
  export interface ParagraphComponentData {
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

    content?: string
    title?: string
  }

  const props = defineProps<ParagraphComponentData>()
</script>
