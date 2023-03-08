<template>
  <v-card>
    <v-tabs v-model="activeTab" bg-color="primary">
      <v-tab :value="tab.uid" v-for="tab in tabs" :key="tab.uid">{{ getTitle(tab) }}</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="activeTab">
        <v-window-item :value="tab.uid" v-for="tab in tabs" :key="tab.uid">
          <component :is="getComponent(tab.typeCode, tab.uid)" v-bind="tab"></component>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
  import type { ComponentData } from '@/api'
  import { getComponent, useCmsComponentStore } from '@/cms'
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'

  export interface TabContainerComponentData {
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

    components: string
  }

  const props = defineProps<TabContainerComponentData>()
  const { t } = useI18n()
  const { search } = useCmsComponentStore()
  const tabs = ref<ComponentData[]>()
  const activeTab = ref<string>()

  const getTitle = (tab: any) => {
    const key = `${tab.uid}.title`
    let title = t(key)
    if (title === key) {
      title = ''
    }
    return title || tab.title || tab.name
  }

  watch(
    () => props.components,
    async comps => {
      // avoid bug in DefaultCMSTabParagraphContainerStategy
      if (comps && comps !== props.uid) {
        const names = comps.split(' ')
        tabs.value = await search(names)
      }
    },
    { immediate: true }
  )
</script>
