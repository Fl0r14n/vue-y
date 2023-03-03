<template>
  <cms-slot position="Section1" />
  <v-row>
    <v-col md="6">
      <cms-slot position="Section2A" v-slot="components">
        <v-row>
          <v-col sm="6" v-for="component in components" :key="component.uid">
            <component :is="component" />
          </v-col>
        </v-row>
      </cms-slot>
    </v-col>
    <v-col md="6">
      <cms-slot position="Section2B" v-slot="components">
        <v-row>
          <v-col sm="6" v-for="component in components" :key="component.uid">
            <component :is="component" />
          </v-col>
        </v-row>
      </cms-slot>
    </v-col>
    <v-col>
      <cms-slot position="Section2C" />
    </v-col>
  </v-row>
  <cms-slot position="Section3" />
  <cms-slot position="Section4" v-slot="components">
    <v-row>
      <v-col sm="6" md="3" v-for="component in components" :key="component.uid">
        <component :is="component" />
      </v-col>
    </v-row>
  </cms-slot>
  <cms-slot position="Section5" />
</template>
<script setup lang="ts"></script>
