<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :icon="isAuthorized ? 'mdi-account' : 'mdi-account-outline'"></v-btn>
    </template>

    <v-card min-width="300">
      <v-card-text class="pb-0">
        <v-form v-model="form.valid" lazy-validation>
          <v-text-field v-model="form.username" :counter="64" :rules="form.usernameRules" label="Username" required></v-text-field>
          <v-text-field
            v-model="form.password"
            :counter="64"
            :rules="form.passwordRules"
            type="password"
            label="Password"
            required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" :disabled="!form.valid" @click="login({ username: form.username, password: form.password })">
          Login
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
  import { OAuthType } from '@/oauth'
  import { useOAuthStore } from '@/oauth/store'
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'

  const menu = ref(false)
  const form = ref({
    valid: false,
    username: '',
    password: '',
    usernameRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) => (v && v.length <= 64) || 'Name must be less than 64 characters'
    ],
    passwordRules: [
      (v: string) => !!v || 'Password is required',
      (v: string) => (v && v.length <= 64) || 'Password must be less than 64 characters'
    ]
  })

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
  const { isAuthorized } = storeToRefs(oauth)
</script>

<style scoped lang="scss"></style>
