<template>
  <div v-for="facet in searchPage?.facets" :key="facet.code">
    <!-- TODO : applied facets -->

    <!-- default facets -->
    <div v-if="facetVisible(facet)">
        <div class="facet-name" @click="toggleFacetVisible(facet)">{{ facet.name }} -</div>
        <div v-if="facet.multiSelect">
            <div v-for="facetValue in facet.values" :key="facetValue.code">
                <!-- TODO : add click event handler -->
                <input type="checkbox" v-model="facetValue.selected"> {{ facetValue.name }} ({{ facetValue.count }})
            </div>
        </div>
        <div v-else>
            <div v-for="facetValue in facet.values" :key="facetValue.code">
                <!-- TODO : add click event handler -->
                <div v-html="facetValue.name + ' (' + facetValue.count + ')'"></div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="facet-name" @click="toggleFacetVisible(facet)">{{ facet.name }} +</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { FacetData } from '@/api';
  import { useSearchStore } from '@/search'
  import { storeToRefs } from 'pinia'

  const { searchPage } = storeToRefs(useSearchStore())

  const facetVisible = (facet : FacetData) => {
    return facet.visible;
  }

  const toggleFacetVisible = (facet : FacetData) => {
    facet.visible = !facet.visible
    return facet.visible
  }

  // query=:relevance:allCategories:1360:brand:brand_753
  // query=:relevance:allCategories:1360:price:$0-$49.99
  // query=:relevance:allCategories:1360:allCategories:brand_4515

</script>

<style scoped lang="scss">
  .facet-name {
    font-weight: bold;
    border-bottom: 1px solid #d3d6db;
  }
</style>
