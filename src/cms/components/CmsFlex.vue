<template>CmsFlex</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface FlexComponentData extends ComponentData {
    flexType: string
  }

  const props = defineProps<FlexComponentData>()
</script>
