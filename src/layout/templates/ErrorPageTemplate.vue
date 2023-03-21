<template>
  <cms-layout>
    <div class="pa-3">
      <cms-slot position="MiddleContent" />
      <cms-slot position="BottomContent" />
      <cms-slot position="SideContent" />
      <div class="d-flex justify-center text-center pa-3">
        <v-btn :to="{ name: 'home' }">Continue Shopping</v-btn>
      </div>
    </div>
  </cms-layout>
</template>
