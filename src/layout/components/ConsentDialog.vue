<template>Consent Dialog</template>
<script setup lang="ts">
  interface ConsentDialogData {
    uid?: string
    uuid?: string
    typeCode?: string
    creationtime?: string
    modifiedtime?: string
    styleClasses?: string
    properties?: object
    name?: string
    container?: string
    flexType?: string
    synchronizationBlocked?: string
  }

  defineProps<ConsentDialogData>()
</script>
