<template>
  <v-menu v-model="isOpen">
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="search"
        clearable
        label="Search..."
        placeholder="cameras"
        style="width: 300px"
        color="primary"
        density="compact"
        hide-details="auto">
        <template v-slot:append-inner>
          <v-icon icon="mdi-magnify" color="primary" style="opacity: 1" v-bind="props" />
        </template>
        <template v-slot:loader>
          <v-progress-linear v-if="loading" color="primary" absolute height="7" indeterminate></v-progress-linear>
        </template>
      </v-text-field>
    </template>

    <v-list style="max-height: 400px">
      <template v-for="(item, i) in items" :key="i">
        <v-list-item :link="true" v-if="item.value" @click="go(item)">
          <template v-slot:title>
            <div v-html="item.value" />
          </template>
        </v-list-item>
        <v-list-item
          :link="true"
          :prepend-avatar="productThumbnailPipe(item)"
          :subtitle="item.price?.formattedValue"
          @click="go(item)"
          v-else>
          <template v-slot:title>
            <div v-html="item.name"></div>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>
<script setup lang="ts">
  import type { ProductData, SuggestionData } from '@/api'
  import { useProductResource } from '@/api/b2c/product.resource'
  import { productThumbnailPipe, routerPath } from '@/cms'
  import { debounceRef } from '@/config'
  import { computed, ref, watch } from 'vue'
  import { useRouter } from 'vue-router'

  interface SearchBoxData {
    uid?: string
    uuid?: string
    typeCode?: string
    creationtime?: string
    modifiedtime?: string
    styleClasses?: string
    properties?: object
    name?: string
    container?: string
    synchronizationBlocked?: string

    maxSuggestions?: string
    maxProducts?: string
    displaySuggestions?: string
    displayProducts?: string
    displayProductImages?: string
    waitTimeBeforeRequest?: string
    minCharactersBeforeRequest?: string
  }

  defineProps<SearchBoxData>()

  const router = useRouter()
  const loading = ref(false)
  const items = ref<(SuggestionData | ProductData)[]>([])
  const search = debounceRef('', 300)
  const productResource = useProductResource()
  const isOpen = computed({
    get: () => items.value.length > 0,
    set: () => {
      search.value = ''
    }
  })

  watch(search, async term => {
    if (term?.length > 2) {
      loading.value = true
      const suggestions = await productResource.suggestions(term).then(r => r.suggestions)
      const products = await productResource
        .search({
          query: term,
          fields: 'products(images(FULL), name, url, price(FULL))'
        })
        .then(r => r.products)
      loading.value = false
      items.value = [...suggestions, ...products]
    } else {
      items.value = []
    }
  })

  const go = (item: any) => {
    return (
      (item.value &&
        router.push({
          name: 'search',
          query: { text: item.value }
        })) ||
      router.push(routerPath(item.url))
    )
  }
</script>
