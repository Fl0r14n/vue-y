<template>
  <cms-slot position="Section1" />
  <v-row no-gutters>
    <v-col cols="12" md="6">
      <cms-slot position="Section2A" v-slot="{ data }">
        <v-row no-gutters>
          <v-col cols="12" sm="6" v-for="d in data" :key="d.uid" v-cms-data="d.properties">
            <component :is="getComponent(d.typeCode, d.uid)" v-bind="d" />
          </v-col>
        </v-row>
      </cms-slot>
    </v-col>
    <v-col cols="12" md="6">
      <cms-slot position="Section2B" v-slot="{ data }">
        <v-row no-gutters>
          <v-col cols="12" sm="6" v-for="d in data" :key="d.uid" v-cms-data="d.properties">
            <component :is="getComponent(d.typeCode, d.uid)" v-bind="d" />
          </v-col>
        </v-row>
      </cms-slot>
    </v-col>
    <v-col cols="12">
      <cms-slot position="Section2C" />
    </v-col>
  </v-row>
  <cms-slot position="Section3" />
  <cms-slot position="Section4" v-slot="{ data }">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="3" v-for="d in data" :key="d.uid" v-cms-data="d.properties">
        <component :is="getComponent(d.typeCode, d.uid)" v-bind="d" />
      </v-col>
    </v-row>
  </cms-slot>
  <cms-slot position="Section5" />
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'
</script>
