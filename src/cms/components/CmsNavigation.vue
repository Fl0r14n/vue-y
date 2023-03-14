<template>
  <cms-node :class="styleClass" v-bind="model" v-if="model" />
</template>
<script setup lang="ts">
  import type { NavNodeData } from '@/api'
  import { navNode } from '@/cms'
  import { ref, watch } from 'vue'

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
  const model = ref<NavNodeData>()

  watch(
    () => props.navigationNode,
    async node => {
      model.value = await navNode(node)
    },
    { immediate: true }
  )
</script>
