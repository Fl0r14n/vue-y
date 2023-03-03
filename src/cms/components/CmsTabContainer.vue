<template>CmsTabContainer</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface TabContainerComponentData extends ComponentData {
    components: string
  }

  const props = defineProps<TabContainerComponentData>()
</script>
