<template>
  <v-card :title="t('login.guestLogin.title', { storefront: localeConfig.storefront })" :subtitle="t('login.guestLogin.subtitle')">
    <template v-slot:text>
      <component :is="getComponent('GuestFormComponent')" />
    </template>
  </v-card>
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'
  import { useLocaleConfig } from '@/config'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const localeConfig = useLocaleConfig()

  interface GuestLogin {
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
    flexType: string
  }

  defineProps<GuestLogin>()
</script>
