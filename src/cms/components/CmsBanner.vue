<template>
  <template v-if="media">
    <img class="w-100" :srcset="srcSet" :alt="name" v-if="!urlLink" />
    <router-link class="d-flex" :to="routerPath(urlLink)" v-if="urlLink">
      <img class="w-100" :srcset="srcSet" :alt="name" />
    </router-link>
  </template>
</template>

<script setup lang="ts">
  import type { MediaContainerData } from '@/api'
  import { hostPipe, routerPath } from '@/cms/filters'
  import { useMediaConfig } from '@/config'
  import { computed } from 'vue'

  const mediaConfig = useMediaConfig()
  const breakpoints = computed(() => mediaConfig.value?.breakpoints)

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
  const srcSet =
    props.media &&
    Object.keys(props.media)
      .map(format => `${hostPipe(props.media?.[format].url)} ${breakpoints.value?.[format]}`)
      .reduce((prev, curr) => `${prev}, ${curr}`)
</script>
