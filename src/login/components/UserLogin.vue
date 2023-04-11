<template>
  <v-card :title="t('login.userLogin.title')" :subtitle="t('login.userLogin.subtitle')">
    <template v-slot:text>
      <component :is="getComponent('LoginFormComponent')" />
    </template>
  </v-card>
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  interface UserLogin {
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
  defineProps<UserLogin>()
</script>
