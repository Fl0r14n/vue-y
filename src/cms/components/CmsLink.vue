<template>
  <a
    :class="styleClasses"
    :href="url"
    :target="(target === 'true' && '_blank') || '_self'"
    rel="noreferrer"
    v-html="linkName"
    v-if="isExternal()" />
  <router-link :class="styleClasses" :to="url" v-else>{{ linkName }}</router-link>
</template>
<script setup lang="ts">
  export interface LinkComponentData {
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

    contentPage?: string
    contentPageLabelOrId?: string
    external?: string | boolean
    linkName?: string
    target?: string | boolean
    url?: string
  }

  const props = defineProps<LinkComponentData>()

  const isExternal = () => props.external === 'true' || props.url?.startsWith('http')
</script>
