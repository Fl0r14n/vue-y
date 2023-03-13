<template>
  <v-footer border style="flex: none">
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link" variant="text" class="mx-2" rounded="xl">
        {{ link }}
      </v-btn>
      <v-col class="text-center mt-4" cols="12"> {{ new Date().getFullYear() }} — <strong>ngx-y</strong> </v-col>
    </v-row>
  </v-footer>
</template>
<script setup lang="ts">
  import type { NavNodeData } from '@/api'

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
    styleClass?: string
    navigationNode?: NavNodeData

    notice?: string
    showLanguageCurrency?: string | boolean
  }

  const props = defineProps<FooterNavigationComponent>()

  const links = ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
</script>
