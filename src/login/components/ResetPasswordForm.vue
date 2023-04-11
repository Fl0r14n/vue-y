<template>
  <a
    class="text-caption text-decoration-none text-blue"
    href="#"
    rel="noopener noreferrer"
    target="_blank"
    v-html="t('login.resetPasswordForm.title')" />
</template>
<script setup lang="ts">
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
