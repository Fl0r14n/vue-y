<template>
  <v-form v-model="form.valid" lazy-validation autocomplete="on" @keyup.enter="form.valid && signIn()">
    <div class="text-subtitle-1 text-medium-emphasis" v-html="t('login.loginForm.username')" />
    <v-text-field
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-email-outline"
      name="username"
      required
      v-model="form.username"
      :placeholder="t('login.loginForm.usernamePlaceholder')"
      :counter="maxLength"
      :rules="form.usernameRules" />
    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      <div v-html="t('login.loginForm.password')" />
      <component :is="getComponent('ResetPasswordFormComponent')" />
    </div>
    <v-text-field
      variant="outlined"
      density="compact"
      prepend-inner-icon="mdi-lock-outline"
      name="password"
      required
      v-model="form.password"
      :counter="maxLength"
      :rules="form.passwordRules"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      :placeholder="t('login.loginForm.passwordPlaceholder')"
      @click:append-inner="visible = !visible" />
    <v-card class="mb-12" color="surface-variant" variant="tonal">
      <template v-slot:text>
        <div class="text-medium-emphasis text-caption" v-html="t('login.loginForm.warning')" />
      </template>
    </v-card>
    <v-alert v-if="hasError" type="error" variant="tonal" closable :text="errorMessage" />
    <v-btn block size="large" variant="tonal" :disabled="!form.valid">{{ t('login.loginForm.login') }}</v-btn>
  </v-form>
</template>
<script setup lang="ts">
  import { getComponent } from '@/cms'
  import { useUserStore } from '@/user'
  import { storeToRefs } from 'pinia'
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'
  import { VForm } from 'vuetify/components'

  const router = useRouter()
  const userStore = useUserStore()
  const { isLogin, token } = storeToRefs(userStore)
  const { login } = userStore
  const maxLength = 64
  const minLength = 6
  const { t } = useI18n()
  const visible = ref(false)
  const form = ref({
    valid: false,
    username: '',
    password: '',
    usernameRules: [
      (v: string) => !!v || t('login.loginForm.usernameRequired'),
      (v: string) => (v && v.length >= minLength) || t('login.loginForm.usernameMinLength', [minLength]),
      (v: string) => (v && v.length <= maxLength) || t('login.loginForm.usernameMaxLength', [maxLength])
    ],
    passwordRules: [
      (v: string) => !!v || t('login.loginForm.passwordRequired'),
      (v: string) => (v && v.length >= minLength) || t('login.loginForm.passwordMinLength', [minLength]),
      (v: string) => (v && v.length <= maxLength) || t('login.loginForm.passwordMaxLength', [maxLength])
    ]
  })

  const signIn = async () => {
    let { username, password, valid } = form.value
    console.log(form.value)
    valid && (await login(username, password))
  }

  watch(isLogin, async isLogin => {
    const { returnUrl } = router.currentRoute.value.query
    if (isLogin) {
      await router.push((returnUrl && { path: returnUrl as string }) || { name: 'home' })
    }
  })

  const hasError = computed(() => !!token.value.error)
  const errorMessage = computed(() => t(`login.loginForm.error.${token.value.error}`))
</script>
