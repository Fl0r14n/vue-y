<template>
  //TODO product rating
  <p v-html="product.code" />
</template>
<script setup lang="ts">
  import { useProductStore } from '@/product'
  import { storeToRefs } from 'pinia'

  const productStore = useProductStore()
  const { product } = storeToRefs(productStore)
</script>
