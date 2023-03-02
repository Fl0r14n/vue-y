<template>HomePage {{ $t('common.cancel') }}</template>

<script setup lang="ts">
  import { PageType } from '@/api'
  import { usePageStore } from '@/cms'
  import { storeToRefs } from 'pinia'

  const { query, page } = storeToRefs(usePageStore())
  query.value = {
    pageType: PageType.CONTENT,
    id: '/homepage'
  }
</script>
