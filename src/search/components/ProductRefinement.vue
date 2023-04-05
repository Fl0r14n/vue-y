<template>
  <!-- applied facets -->
  <v-card v-if="searchPage?.breadcrumbs?.length">
    <v-card-title>{{ $t('search.facetApplied') }}</v-card-title>
    <v-list>
      <v-list-item
        v-for="breadcrumb in searchPage?.breadcrumbs"
        :key="breadcrumb.facetValueCode"
        :title="breadcrumb.facetValueName"
        :link="true"
        :href="routerPath(breadcrumb.removeQuery?.url)"
        append-icon="mdi-checkbox-outline">
      </v-list-item>
    </v-list>
  </v-card>

  <!-- default facets -->
  <v-card v-for="facet in searchPage?.facets" :key="facet.code">
    <v-card-title @click="toggleFacetVisible(facet)">{{ getFacetNameWithVisibility(facet) }}</v-card-title>
    <div v-if="facetVisible(facet)">
      <v-list v-if="facet.multiSelect">
        <!-- TODO : change it as checkbox form ; v-checkbox looks ugly here... -->
        <v-list-item
          v-for="facetValue in facet.values"
          :key="facetValue.code"
          :title="facetValue.name + ' (' + facetValue.count + ')'"
          :link="true"
          :href="routerPath(facetValue.query?.url)"
          prepend-icon="mdi-checkbox-blank-outline">
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          v-for="facetValue in facet.values"
          :key="facetValue.code"
          :title="facetValue.name + ' (' + facetValue.count + ')'"
          :link="true"
          :href="routerPath(facetValue.query?.url)"></v-list-item>
      </v-list>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import type { FacetData } from '@/api'
  import { routerPath } from '@/cms'
  import { useSearchStore } from '@/search'
  import { storeToRefs } from 'pinia'

  interface ProductRefinement {
    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string
    modifiedtime?: string | Date
    synchronizationBlocked?: any
  }

  defineProps<ProductRefinement>()

  const { searchPage } = storeToRefs(useSearchStore())

  const facetVisible = (facet: FacetData) => {
    return facet.visible
  }

  const toggleFacetVisible = (facet: FacetData) => {
    facet.visible = !facet.visible
    return facet.visible
  }

  const getFacetNameWithVisibility = (facet: FacetData) => {
    return facet.visible ? facet.name + ' - ' : facet.name + ' + '
  }
</script>
