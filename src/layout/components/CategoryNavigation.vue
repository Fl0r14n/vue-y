<template>
  <template v-for="node in getChildren(model)" :key="node.uid">
    <template v-if="!hasChildren(node)">
      <v-btn :to="routerPath(entry.url)" v-for="entry in getEntries(node)" :key="entry.uid">{{ entry.linkName }}</v-btn>
    </template>
    <v-btn append-icon="mdi-chevron-down" v-else>
      {{ node.title }}
      <v-menu activator="parent" open-on-hover>
        <v-list nav density="compact">
          <v-list-item
            active-color="primary"
            :to="routerPath(entry.url)"
            :link="true"
            v-for="entry in getEntries(node)"
            :key="entry.uid"
            :text="entry.linkName" />
          <template v-for="cNode in getChildren(node)" :key="cNode.uid">
            <v-list-item-subtitle v-if="cNode.title">{{ cNode.title }}</v-list-item-subtitle>
            <v-list-item
              active-color="primary"
              :to="routerPath(entry.url)"
              :link="true"
              v-for="entry in getEntries(cNode)"
              :key="entry.uid"
              :text="entry.linkName" />
            <template v-for="ccNode in getChildren(cNode)" :key="ccNode.uid">
              <v-list-item-subtitle v-if="cNode.title">{{ ccNode.title }}</v-list-item-subtitle>
              <v-list-item
                active-color="primary"
                :to="routerPath(entry.url)"
                :link="true"
                v-for="entry in getEntries(ccNode)"
                :key="entry.uid"
                :text="entry.linkName" />
            </template>
          </template>
        </v-list>
      </v-menu>
    </v-btn>
  </template>
</template>
<script setup lang="ts">
  import type { NavNodeData } from '@/api'
  import { navNode, routerPath } from '@/cms'
  import { ref, watch } from 'vue'

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

  const props = defineProps<CategoryNavigationData>()
  const model = ref<NavNodeData>()

  watch(
    () => props.navigationNode,
    async node => {
      model.value = await navNode(node)
    },
    { immediate: true }
  )

  const hasChildren = (node?: NavNodeData) => (node?.children?.length || 0) > 0
  const getChildren = (node?: NavNodeData) => node?.children || []
  const getEntries = (node?: NavNodeData) => node?.entries || []
</script>
