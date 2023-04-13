<template>
  <v-card :title="t('login.userRegister.title')" :subtitle="t('login.userRegister.subtitle')">
    <template v-slot:text>
      <component :is="getComponent('RegisterFormComponent')" />
    </template>
  </v-card>
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  interface UserRegister {
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

  defineProps<UserRegister>()
</script>
<style scoped lang="scss">
  :deep(.v-card-subtitle) {
    white-space: normal;
  }
</style>
