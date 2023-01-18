<template>
  {{ props.msg }}
  <button @click="emits('update-msg', 'Hello from the other side')">Click me</button>
  <slot />
</template>

<script setup lang="ts">
  import { OAuthType } from '@/oauth'
  import { useOAuthStore } from '@/oauth/store'

  const props = withDefaults(
    defineProps<{
      type?: OAuthType
      useLogoutUrl?: boolean
      state?: string
    }>(),
    {
      type: OAuthType.RESOURCE,
      useLogoutUrl: false
    }
  )
  const emits = defineEmits<{
    (event: 'update-msg', msg: string): void
  }>()

  const oauth = useOAuthStore()
  const { login, logout } = oauth
  console.log(login, logout)

  console.log(oauth)
</script>

<style scoped lang="scss"></style>
