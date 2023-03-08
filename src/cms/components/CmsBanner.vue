<template>
  <template v-if="media">
    <img :class="`w-100 ${typeCode} ${styleClasses || ''}`" :srcset="srcSet" :alt="name" v-if="!urlLink" />
    <router-link :class="`d-flex ${typeCode} ${styleClasses || ''}`" :to="routerPath(urlLink)" v-if="urlLink">
      <img class="w-100" :srcset="srcSet" :alt="name" />
    </router-link>
  </template>
</template>

<script setup lang="ts">
  import type { MediaContainerData } from '@/api'
  import { mediaSrcSetPipe, routerPath } from '@/cms/filters'

  interface BannerComponentData {
    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string
    creationtime?: string | Date
    modifiedtime?: string | Date
    synchronizationBlocked?: any
    styleClasses?: string

    media?: MediaContainerData
    urlLink?: string
  }

  const props = defineProps<BannerComponentData>()
  const srcSet = mediaSrcSetPipe(props.media)
</script>
