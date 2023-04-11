<template>
  <cms-layout>
    <cms-slot position="LeftContentSlot" v-slot="{ data }">
      <v-row>
        <v-col cols="12" md="6" v-for="d in data" :key="d.uid" v-cms-data="d.properties">
          <component :is="getComponent(d.typeCode, d.uid)" v-bind="d" />
        </v-col>
      </v-row>
    </cms-slot>
    <cms-slot position="RightContentSlot" />
  </cms-layout>
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'
</script>
