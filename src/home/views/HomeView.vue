<template>HomePage {{ $t('common.cancel') }}</template>

<script setup lang="ts">
  import { useBaseSiteApi } from '@/api/base'

  const baseSiteApi = useBaseSiteApi()
  baseSiteApi.getBaseSites().then(s => console.log(s))
</script>
