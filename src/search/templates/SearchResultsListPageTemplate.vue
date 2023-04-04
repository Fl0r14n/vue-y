<template>
  <cms-layout><!-- text search -->
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <cms-slot position="ProductLeftRefinements" />
      </v-col>
      <v-col cols="12" md="8">
        <cms-slot position="SearchResultsListSlot" />
      </v-col>
    </v-row>
  </cms-layout>
</template>
