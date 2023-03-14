<template>
  <nav :class="styleClasses">
    <div v-html="title" v-if="title" />
    <component :is="getComponent(entry.typeCode, entry.uid)" v-for="entry in entries" :key="entry.itemId" v-bind="entry" />
    <cms-node v-for="child in children" :key="child.uid" v-bind="child" />
  </nav>
</template>
<script setup lang="ts">
  import type { NavNodeData, NavNodeEntryData } from '@/api'
  import { getComponent } from '@/cms'

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
