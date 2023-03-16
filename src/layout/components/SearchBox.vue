<template>Search Box</template>
<script setup lang="ts">
  interface SearchBoxData {
    uid?: string
    uuid?: string
    typeCode?: string
    creationtime?: string
    modifiedtime?: string
    styleClasses?: string
    properties?: object
    name?: string
    container?: string
    synchronizationBlocked?: string

    maxSuggestions?: string
    maxProducts?: string
    displaySuggestions?: string
    displayProducts?: string
    displayProductImages?: string
    waitTimeBeforeRequest?: string
    minCharactersBeforeRequest?: string
  }

  defineProps<SearchBoxData>()
</script>
