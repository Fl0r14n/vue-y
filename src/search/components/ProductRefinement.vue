<template>
  <div v-for="facet in searchPage?.facets" :key="facet.code">
    <!-- TODO : applied facets ; to render this, need to get breadcrumb (Store should be updated) -->


    <!-- default facets -->
    <v-card>
      <v-card-title @click="toggleFacetVisible(facet)">{{ getFacetNameWithVisibility(facet) }}</v-card-title>
      <div v-if="facetVisible(facet)">
        <v-list v-if="facet.multiSelect">
          <!-- TODO : change it as checkbox form ; v-checkbox looks ugly here... -->
          <v-list-item v-for="facetValue in facet.values"
              :key="facetValue.code"
              :title="facetValue.name + ' (' + facetValue.count + ')'"
              :link="true" :href="routerPath(facetValue.query?.url)"></v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item v-for="facetValue in facet.values"
              :key="facetValue.code"
              :title="facetValue.name + ' (' + facetValue.count + ')'"
              :link="true" :href="routerPath(facetValue.query?.url)"></v-list-item>
        </v-list>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import type { FacetData } from '@/api';
  import { useSearchStore } from '@/search'
  import { storeToRefs } from 'pinia'
  import { routerPath } from '@/cms';

  const { searchPage } = storeToRefs(useSearchStore())

  const facetVisible = (facet : FacetData) => {
    return facet.visible;
  }

  const toggleFacetVisible = (facet : FacetData) => {
    facet.visible = !facet.visible
    return facet.visible
  }

  const getFacetNameWithVisibility = (facet : FacetData) => {
    return facet.visible ? facet.name + ' - ' : facet.name + ' + ';
  }
</script>
