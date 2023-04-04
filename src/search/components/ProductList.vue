<template>
  <v-row>
    <v-col cols="12" sm="5" lg="3">
      <v-select :items="sorts" item-value="code" item-title="name" v-model="sort" />
    </v-col>
    <v-col cols="12" sm="3" lg="3">
      <v-select :items="pageSizes" item-value="code" item-title="name" v-model="pageSize" />
    </v-col>
    <v-col cols="12" sm="4" lg="3"></v-col>
  </v-row>

  <div v-for="product in products" :key="product.code" class="productListElement">
    <v-row>
      <v-col cols="12" md="4">
        <img :src="productImagePipe(product)" :alt="product.name" />
      </v-col>
      <v-col cols="12" md="8">
        <div v-html="product.name"></div>
        <div v-html="product.price?.formattedValue"></div>
        <div v-html="product.description"></div>
        <!-- TODO : add to cart button ; when cart.component is done -->
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

  const pageSizes = [5, 10, 15, 20, 30, 50]
  const { pageSize, sort, sorts, currentPage, products, pagination } = storeToRefs(useSearchStore())

  const page = computed({
    get: () => (currentPage.value || 0) + 1,
    set: v => (currentPage.value = v - 1)
  })

  // TODO : Spartacus uses page size = 12, we use 20 ... try to change!

  // TODO : when changes category page, the result is updated one step later. why? maybe mount()? (should apply to ProductRefinement component also)
</script>
