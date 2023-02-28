<template>HomePage {{ $t('common.cancel') }}</template>

<script setup lang="ts">
  import { useBaseSiteResource, useBaseStoreResource } from '@/api/base'

  const siteResource = useBaseSiteResource()
  const storeResource = useBaseStoreResource()
  const sites = await siteResource.getBaseSites()
  const stores = await storeResource.getBaseStore(sites.baseSites[0].uid)
</script>
