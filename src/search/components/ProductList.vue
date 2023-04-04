<template>
  <v-row>
    <v-col cols="12" md="4">
        <v-select
            :items="searchPage?.sorts"
            item-value="code"
            item-title="name"/>
    </v-col>
    <v-col cols="12" md="8">
        <v-pagination :length="searchPage?.pagination?.totalPages"></v-pagination>
    </v-col>
  </v-row>

  <div v-for="product in searchPage?.products" :key="product.code" class="productListElement">
    <v-row>
        <v-col cols="12" md="4">
            <img :src="productImagePipe(product)" :alt="product.name"/>
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

  <v-row>
    <v-col cols="12" md="4">
        <v-select
            :items="searchPage?.sorts"
            item-value="code"
            item-title="name"/>
    </v-col>
    <v-col cols="12" md="8">
        <v-pagination :length="searchPage?.pagination?.totalPages"></v-pagination>
    </v-col>
  </v-row>

</template>
<script setup lang="ts">
  import { productImagePipe } from '@/cms'
  import { useSearchStore } from '@/search'
  import { storeToRefs } from 'pinia'

  const { pageSize, searchPage } = storeToRefs(useSearchStore())
  // TODO : Spartacus uses page size = 12, we use 20 ... try to change!

  // TODO : when changes category page, the result is updated one step later. why? maybe mount()? (should apply to ProductRefinement component also)
</script>
