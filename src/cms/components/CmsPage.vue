<template>
  <div ref="el" :class="template" v-if="template">
    <component :is="getTemplate(template, uid)" />
  </div>
</template>
<script setup lang="ts">
  import { PageType } from '@/api'
  import { cmsData, getTemplate, usePageStore } from '@/cms'
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'

  const el = ref<Element>()
  const router = useRouter()
  const pageStore = usePageStore()
  const { uid, template, query, properties } = storeToRefs(pageStore)

  watch(
    router.currentRoute,
    route => {
      query.value = {
        id: (route.meta.id || route.params.id) as string,
        pageType: (route.meta.pageType || PageType.CONTENT) as PageType,
        cmsTicketId: (route.meta.cmsTicketId || route.query.cmsTicketId) as string
      }
    },
    { immediate: true }
  )

  watch(el, e => cmsData(e?.ownerDocument.body, properties))
</script>
