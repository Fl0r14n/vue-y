<template>
  <div ref="el" :class="template" v-if="template">
    <component :is="getTemplate(template, uid)" />
  </div>
</template>
<script setup lang="ts">
  import { PageType } from '@/api'
  import { cmsData, usePageStore } from '@/cms'
  import { injectCmsTemplate } from '@/config'
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent, markRaw, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  const el = ref<Element>()
  const route = useRoute()
  const pageStore = usePageStore()
  const { uid, template, query, properties } = storeToRefs(pageStore)
  query.value = {
    id: (route.meta.id || route.params.id) as string,
    pageType: (route.meta.pageType || PageType.CONTENT) as PageType,
    cmsTicketId: (route.meta.cmsTicketId || route.query.cmsTicketId) as string
  }

  const getTemplate = (template: string, uid?: string) => {
    const injected = injectCmsTemplate(template, uid)
    const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
    return markRaw(instance)
  }

  watch(el, e => cmsData(el.value?.ownerDocument.body, properties))
</script>
