<template>
  <v-row>
    <v-col cols="12" sm="5" lg="3">
      <v-select :items="sorts" item-value="code" item-title="name" v-model="sort" />
    </v-col>
    <v-col cols="12" sm="3" lg="3">
      <v-select :items="pageSizes" item-value="code" item-title="name" v-model="pageSize" />
    </v-col>
    <v-col cols="12" sm="4" lg="3">
      <v-label :text="pagination?.totalResults + ' Products found'"></v-label>
    </v-col>
  </v-row>

  <div v-for="product in products" :key="product.code" class="productListElement">
    <v-row>
      <v-col cols="12" md="4">
        <v-img :src="productImagePipe(product)" :alt="product.name" height="200px" />
      </v-col>
      <v-col cols="12" md="8">
        <div v-html="product.name"></div>
        <div v-html="product.summary"></div>
        <div v-html="product.price?.formattedValue"></div>
        <v-btn>Add-to-cart (TODO)</v-btn>
      </v-col>
    </v-row>
  </div>

  <v-pagination :length="pagination?.totalPages" :total-visible="5" v-model="page"></v-pagination>
</template>
<script setup lang="ts">
  import { productImagePipe } from '@/cms'
  import { useSearchStore } from '@/search'
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  interface ProductList {
    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string
    modifiedtime?: string | Date
    synchronizationBlocked?: any
  }

  defineProps<ProductList>()

  const pageSizes = [5, 10, 15, 20, 30, 50]
  const { pageSize, sort, sorts, currentPage, products, pagination } = storeToRefs(useSearchStore())

  const page = computed({
    get: () => (currentPage.value || 0) + 1,
    set: v => (currentPage.value = v - 1)
  })

  // TODO : when changes category page, the result is updated one step later. why? maybe mount()? (should apply to ProductRefinement component also)
</script>
