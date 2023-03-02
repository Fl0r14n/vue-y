<template>
  <div :class="template">
    <component :is="component" />
  </div>
</template>
<script setup lang="ts">
  import { PageType } from '@/api'
  import { usePageStore } from '@/cms'
  import { injectCmsTemplate } from '@/config'
  import { storeToRefs } from 'pinia'
  import { markRaw, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const pageStore = usePageStore()
  const { uid, template, query } = storeToRefs(pageStore)
  const component = ref()
  query.value = {
    id: (route.meta.id || route.params.id) as string,
    pageType: (route.meta.pageType || PageType.CONTENT) as PageType,
    cmsTicketId: (route.meta.cmsTicketId || route.query.cmsTicketId) as string
  }

  watch(
    template,
    async t => {
      if (t) {
        const injected = injectCmsTemplate(t, uid.value)
        const instance = (typeof injected === 'function' && (await injected()).default) || injected
        component.value = markRaw(instance)
      }
    },
    {
      immediate: true
    }
  )
</script>
