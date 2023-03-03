<template>CmsParagraph</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'

  export interface ParagraphComponentData extends ComponentData {
    content?: string
    title?: string
  }

  const props = defineProps<ParagraphComponentData>()
</script>
