<template>HomePage {{ $t('common.cancel') }}</template>

<script setup lang="ts">
  import { useBaseSiteApi } from '@/api/base'

  const siteApi = useBaseSiteApi()
  siteApi.getBaseSites().then(s => console.log(s))
</script>
