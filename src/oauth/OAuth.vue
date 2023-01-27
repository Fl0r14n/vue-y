<template>
  <v-menu v-model="menu" rounded :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :icon="isAuthorized ? 'mdi-account' : 'mdi-account-outline'"></v-btn>
    </template>

    <v-card>
      <template v-if="isAuthorized">
        <slot name="userInfo" :user="user" :logout="signOut" v-if="$slots.user" />
        <v-list v-else>
          <v-list-item :title="user.name" :subtitle="user.email">
            <template #prepend>
              <v-avatar color="primary">
                <v-img :src="user.picture" v-if="user.picture"></v-img>
                <span class="text-h5" v-else v-html="user.initials"></span>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="signOut()">{{ t('oauth.logout') }}</v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <template v-if="type === OAuthType.RESOURCE">
          <v-card-text class="pb-0">
            <v-form ref="f" v-model="form.valid" lazy-validation autocomplete="on" @keyup.enter="form.valid && signIn()">
              <v-text-field
                v-model="form.username"
                name="username"
                required
                :label="t('oauth.username')"
                :counter="length"
                :rules="form.usernameRules"></v-text-field>
              <v-text-field
                v-model="form.password"
                name="password"
                type="password"
                required
                :label="t('oauth.password')"
                :counter="length"
                :rules="form.passwordRules"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="text" type="submit" :disabled="!form.valid" @click="signIn">
              {{ t('oauth.login') }}
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="login({ responseType: responseType || type, redirectUri: getRedirectUri(), state })">
              {{ t('oauth.login') }}
            </v-btn>
          </v-card-actions>
        </template>
      </template>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
  import { OAuthType } from '@/oauth/models'
  import { useOAuth, useOAuthUser } from '@/oauth/module'
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { VForm } from 'vuetify/components'

  const length = 128
  const { t } = useI18n()
  const { login, logout, isAuthorized } = useOAuth()
  const user = useOAuthUser()
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
  const f = ref<any>()
  const menu = ref(false)
  const form = ref({
    valid: false,
    username: '',
    password: '',
    usernameRules: [
      (v: string) => !!v || t('oauth.usernameRequired'),
      (v: string) => (v && v.length <= length) || t('oauth.usernameLength', [length])
    ],
    passwordRules: [
      (v: string) => !!v || t('oauth.passwordRequired'),
      (v: string) => (v && v.length <= length) || t('oauth.passwordLength', [length])
    ]
  })

  const signIn = () => {
    let { username, password } = form.value
    login({ username, password })
    f.value.reset()
  }

  const signOut = () => {
    menu.value = false
    logout(props.useLogoutUrl)
  }

  const getRedirectUri = () => {
    const { origin, pathname, search } = location
    return props.redirectUri || `${origin}${pathname}${search}`
  }

  watch(
    user,
    () => {
      const { given_name, family_name } = user.value
      user.value.initials = `${given_name?.charAt(0)}${family_name?.charAt(0)}`
    },
    { immediate: true }
  )
</script>
