<template>
  <cms-layout><!-- category search -->
    <cms-slot position="Section1" /> <!-- {{ searchPage?.pagination?.totalResults }} results -->
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <cms-slot position="ProductLeftRefinements" />
      </v-col>
      <v-col cols="12" md="8">
        <cms-slot position="ProductListSlot" />
      </v-col>
    </v-row>
  </cms-layout>
</template>
