<template>
  <template v-if="media">
    <img :class="`w-100 ${typeCode} ${styleClasses || ''}`" :src="media.url" :alt="altText" v-if="!urlLink" />
    <template v-else>
      <a :href="urlLink" :class="`${typeCode} ${styleClasses || ''}`" target="_blank" ref="noreferrer" v-if="isExternal()">
        <img class="w-100" :src="hostPipe(media.url)" :alt="altText" />
      </a>
      <router-link :class="`d-flex ${typeCode} ${styleClasses || ''}`" :to="routerPath(urlLink)" v-else>
        <img class="w-100" :src="hostPipe(media.url)" :alt="altText" />
      </router-link>
    </template>
  </template>
</template>
<script setup lang="ts">
  import type { MediaData } from '@/api'
  import { hostPipe, routerPath } from '@/cms'

  export interface ImageComponentData {
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

    media?: MediaData
    external?: string | boolean
    urlLink?: string
    altText?: string
  }

  const props = defineProps<ImageComponentData>()

  const isExternal = () => props.external === 'true' || props.urlLink?.startsWith('http')
</script>
