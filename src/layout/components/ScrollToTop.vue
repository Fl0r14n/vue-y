<template>
  <v-btn class="scroll-to-top float-right" icon="mdi-chevron-up" @click="scrollToTop()" v-scroll="onScroll" v-show="visible" />
</template>
<script setup lang="ts">
  import { ref } from 'vue'

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
  const visible = ref(false)

  const threshold = (window.innerHeight || 300) / 2

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const onScroll = () => (visible.value = window.scrollY > threshold)
</script>

<style scoped lang="scss">
  .scroll-to-top {
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 3rem;
  }
</style>
