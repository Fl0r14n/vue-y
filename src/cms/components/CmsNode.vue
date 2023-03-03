<template>CmsNode</template>
<script setup lang="ts">
  import type { NavNodeData } from '@/api'
  interface CmsNodeData extends NavNodeData {}
  const props = defineProps<CmsNodeData>()
</script>
