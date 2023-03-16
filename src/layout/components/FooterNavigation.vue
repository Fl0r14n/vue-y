<template>
  <v-footer border style="flex: none" :class="`${styleClasses || ''} ${uid}`">
    <v-row justify="center" no-gutters>
      <template v-if="model">
        <v-list density="compact" v-for="child in model.children" :key="child.uid">
          <v-list-item>
            <v-list-item-title class="font-weight-bold">{{ child.title }}</v-list-item-title>
          </v-list-item>
          <template v-for="grandChild in child.children" :key="grandChild.uid">
            <v-list-item :link="entry.itemType === 'CMSLinkComponent'" v-for="entry in grandChild.entries" :key="entry.itemId">
              <v-list-item-title>
                <component class="text-decoration-none" :is="getComponent(entry.typeCode, entry.uid)" v-bind="entry" />
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
        <v-list v-if="showLanguageCurrency">
          <v-list-item />
          <v-list-item>
            <v-list-item-title>
              <component :is="getComponent('CMSSiteContextComponent')" v-bind="{ context: 'LANGUAGE' }" />
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <component :is="getComponent('CMSSiteContextComponent')" v-bind="{ context: 'CURRENCY' }" />
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <v-col class="text-center mt-4" cols="12">
        <div v-html="notice" />
      </v-col>
    </v-row>
  </v-footer>
</template>
<script setup lang="ts">
  import type { NavNodeData } from '@/api'
  import { getComponent, navNode } from '@/cms'
  import { ref, watch } from 'vue'

  interface FooterNavigationComponent {
    synchronizationBlocked?: any
    creationtime?: string | Date
    modifiedtime?: string | Date

    container?: string | boolean
    properties?: object
    name?: string
    typeCode?: string
    uid?: string
    uuid?: string

    wrapAfter?: string | number
    styleClasses?: string
    navigationNode?: NavNodeData

    notice?: string
    showLanguageCurrency?: string | boolean
  }

  const props = defineProps<FooterNavigationComponent>()
  const model = ref<NavNodeData>()

  watch(
    () => props.navigationNode,
    async node => {
      model.value = await navNode(node)
    },
    { immediate: true }
  )
</script>
