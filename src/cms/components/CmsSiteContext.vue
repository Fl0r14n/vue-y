<template>
  <v-select
    v-model="language"
    :items="languages"
    item-value="isocode"
    item-title="name"
    :variant="variant"
    v-if="context.toLowerCase() === 'language'" />
  <v-select
    v-model="currency"
    :items="currencies"
    item-value="isocode"
    item-title="name"
    :variant="variant"
    v-if="context.toLowerCase() === 'currency'" />
  <v-select
    v-model="storefront"
    :items="storefronts"
    item-value="code"
    item-title="name"
    :variant="variant"
    v-if="context.toLowerCase() === 'storefront'" />
</template>
<script setup lang="ts">
  import { useLocaleStore } from '@/cms'
  import { storeToRefs } from 'pinia'

  interface SiteContextData {
    synchronizationBlocked?: any
    creationtime?: string | Date
    modifiedtime?: string | Date
    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string
    context: string
    variant: string
  }

  const props = withDefaults(defineProps<SiteContextData>(), { variant: 'underlined' })
  const { storefront, storefronts, language, languages, currency, currencies } = storeToRefs(useLocaleStore())
</script>
