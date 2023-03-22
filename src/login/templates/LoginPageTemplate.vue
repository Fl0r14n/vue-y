<template>
  <cms-layout>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <cms-slot position="LeftContentSlot" />
      </v-col>
      <v-col cols="12" md="6">
        <cms-slot position="RightContentSlot" />
      </v-col>
    </v-row>
  </cms-layout>
</template>
