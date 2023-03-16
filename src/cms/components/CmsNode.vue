<template>
  <v-list density="compact" :class="`${styleClasses || ''} ${uid}`">
    <v-list-subheader v-if="title">
      <div v-html="title" />
    </v-list-subheader>
    <v-list-item :link="entry.itemType === 'CMSLinkComponent'" v-for="entry in entries" :key="entry.itemId">
      <v-list-item-title>
        <component class="text-decoration-none" :is="getComponent(entry.typeCode, entry.uid)" v-bind="entry" />
      </v-list-item-title>
    </v-list-item>
    <cms-node v-for="child in children" :key="child.uid" v-bind="child" />
  </v-list>

  <!--  <nav :class="`${styleClasses || ''} ${uid}`">-->
  <!--    <div v-html="title" v-if="title" />-->
  <!--    <component :is="getComponent(entry.typeCode, entry.uid)" v-for="entry in entries" :key="entry.itemId" v-bind="entry" />-->
  <!--    <cms-node v-for="child in children" :key="child.uid" v-bind="child" />-->
  <!--  </nav>-->
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
