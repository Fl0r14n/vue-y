<template>Scroll to top</template>
<script setup lang="ts">
  interface ScrollToTopData {
    uid?: string
    uuid?: string
    typeCode?: string
    creationtime?: string
    modifiedtime?: string
    styleClasses?: string
    properties?: object
    name?: string
    container?: string
    flexType?: string
    synchronizationBlocked?: string
  }

  defineProps<ScrollToTopData>()
</script>
