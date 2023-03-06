<template>
  <div :class="position" v-cms-data="properties">
    <div v-for="data in slotData" :key="data.uid" v-cms-data="data.properties">
      <component :is="getComponent(data)" v-bind="data" />
    </div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'
  import { usePageStore } from '@/cms'
  import { injectCmsComponent } from '@/config'
  import { storeToRefs } from 'pinia'
  import { computed, defineAsyncComponent, markRaw } from 'vue'

  const props = defineProps<{
    position: string
  }>()
  const { slots } = storeToRefs(usePageStore())
  const slot = computed(() => slots.value?.contentSlot.find(s => s.position === props.position))
  const properties = computed(() => slot.value?.properties)
  const slotData = computed(() => slot.value?.components?.component)

  const getComponent = (data: ComponentData) => {
    const injected = injectCmsComponent(data.typeCode || '', data.uid)
    const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
    return markRaw(instance)
  }
</script>
