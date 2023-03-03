<template>
  <component :is="getComponent(data)" v-bind="data" v-for="data in slotData" :key="data.uid" />
  <slot></slot>
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
  const slotData = computed(() => slot.value?.components?.component)

  const getComponent = (data: ComponentData) => {
    const injected = injectCmsComponent(data.typeCode || '', data.uid)
    const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
    return markRaw(instance)
  }
</script>
