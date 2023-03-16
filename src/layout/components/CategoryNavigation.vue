<template>Category Navigation</template>
<script setup lang="ts">
  import { NavNodeData } from '@/api'

  interface CategoryNavigationData {
    uid?: string
    uuid?: string
    typeCode?: string
    creationtime?: string
    modifiedtime?: string
    styleClasses?: string
    properties?: object
    name?: string
    container?: string
    synchronizationBlocked?: string
    wrapAfter?: string
    navigationNode?: NavNodeData
  }

  defineProps<CategoryNavigationData>()
</script>
