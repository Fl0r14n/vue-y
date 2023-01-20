<template>
  <v-menu v-model="menu" rounded :close-on-content-click="false" location="bottom" v-if="type === OAuthType.RESOURCE">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :icon="isAuthorized ? 'mdi-account' : 'mdi-account-outline'"></v-btn>
    </template>

    <v-card min-width="300">
      <template v-if="isAuthorized">
        <v-card-item>{{ JSON.stringify(user) }}</v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="logout"> Logout</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <v-card-text class="pb-0">
          <v-form ref="f" v-model="form.valid" lazy-validation autocomplete="on" @keyup.enter="form.valid && submit()">
            <v-text-field
              v-model="form.username"
              name="username"
              label="Username"
              required
              :counter="length"
              :rules="form.usernameRules"></v-text-field>
            <v-text-field
              v-model="form.password"
              name="password"
              type="password"
              label="Password"
              required
              :counter="length"
              :rules="form.passwordRules"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" type="submit" :disabled="!form.valid" @click="submit"> Login</v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-menu>
  <v-btn
    :icon="isAuthorized ? 'mdi-account' : 'mdi-account-outline'"
    v-else
    @click="isAuthorized ? logout() : login({ responseType: responseType || type, redirectUri: getRedirectUri(), state })"></v-btn>
</template>

<script setup lang="ts">
  import { OAuthType } from '@/oauth'
  import { useOAuthStore } from '@/oauth/store'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import type { VForm } from 'vuetify/components'

  const length = 128

  const props = withDefaults(
    defineProps<{
      type?: OAuthType | string
      useLogoutUrl?: boolean
      redirectUri?: string
      responseType?: string
      state?: string
    }>(),
    {
      type: 'password',
      useLogoutUrl: false
    }
  )
  const emits = defineEmits<{
    (event: 'update-msg', msg: string): void
  }>()

  const f = ref<any>()
  const menu = ref(false)
  const form = ref({
    valid: false,
    username: '',
    password: '',
    usernameRules: [
      (v: string) => !!v || 'Name is required',
      (v: string) => (v && v.length <= length) || 'Name must be less than 64 characters'
    ],
    passwordRules: [
      (v: string) => !!v || 'Password is required',
      (v: string) => (v && v.length <= length) || 'Password must be less than 64 characters'
    ]
  })

  const submit = () => {
    let { username, password } = form.value
    login({ username, password })
    f.value.reset()
  }

  const getRedirectUri = () => props.redirectUri || location.href

  const oauth = useOAuthStore()
  const { login, logout } = oauth
  const { isAuthorized, user } = storeToRefs(oauth)
</script>

<style scoped lang="scss"></style>
