<template>
  <div class="text-center font-weight-bold v-card-title" v-html="title" v-if="title" />
  <v-carousel hide-delimiter-background show-arrows="hover" height="350px">
    <v-carousel-item v-for="product of products" :key="product.code">
      <router-link :to="routerPath(product.url)" class="text-decoration-none text-center">
        <v-card variant="flat" class="mx-auto" max-width="344">
          <v-img :src="hostPipe(productImagePipe(product))" :alt="product.name" height="200px" />
          <v-card-title><span v-html="product.name" /></v-card-title>
          <v-card-subtitle v-if="product.price">
            <span v-html="product.price.formattedValue" />
          </v-card-subtitle>
        </v-card>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>
<script setup lang="ts">
  import type { ProductData } from '@/api'
  import { hostPipe, productImagePipe, routerPath, useCmsProductStore } from '@/cms'
  import { ref, watch } from 'vue'

  export interface ProductCarouselComponentData {
    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string
    creationtime?: string | Date
    modifiedtime?: string | Date
    synchronizationBlocked?: any
    styleClasses?: string

    popup?: string | boolean
    productCodes?: string
    scroll?: string
    title?: string
    //from ProductReferencesComponentData
    displayProductPrices?: boolean
    displayProductTitles?: boolean
    maximumNumberProducts?: number
  }

  const props = defineProps<ProductCarouselComponentData>()
  const { search } = useCmsProductStore()
  const products = ref<ProductData[]>()
  watch(
    () => props.productCodes,
    async productCodes => {
      if (productCodes) {
        // const fields = `images(FULL),${(props.displayProductPrices !== false && 'price(FULL),') || ''}${
        //   (props.displayProductTitles !== false && 'name,') || ''
        // }code,url`
        const fields = `images(FULL),price(FULL),name,code,url`
        let codes = productCodes.split(' ')
        if (props.maximumNumberProducts && props.maximumNumberProducts > 0) {
          codes = codes.slice(0, props.maximumNumberProducts)
        }
        products.value = await search(codes, { fields })
        console.log(products.value)
        //TODO replace v-img with img and src set
      }
    },
    { immediate: true }
  )
</script>
