<template>
  <div :class="position" v-cms-data="properties">
    <slot :data="slotData">
      <div v-for="data in slotData" :key="data.uid" v-cms-data="data.properties">
        <component :is="getComponent(data.typeCode, data.uid)" v-bind="data" />
      </div>
    </slot>
  </div>
</template>
<script setup lang="ts">
  import { getComponent, usePageStore } from '@/cms'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  const props = defineProps<{
    position: string
  }>()
  const { slots } = storeToRefs(usePageStore())
  const slot = computed(() => slots.value?.contentSlot.find(s => s.position === props.position))
  const properties = computed(() => slot.value?.properties)
  const slotData = computed(() => slot.value?.components?.component)
</script>
