<template>
  <v-form v-model="form.valid" lazy-validation autocomplete="on" @keyup.enter="form.valid && register()">
    <v-select
      name="titleCode"
      :label="t('login.registerForm.title')"
      v-model="form.titleCode"
      :items="titles"
      item-value="code"
      item-title="name"
      :rules="form.titleCodeRules" />
    <v-text-field name="firstName" :label="t('login.registerForm.firstName')" v-model="form.firstName" :rules="form.firstNameRules" />
    <v-text-field name="lastName" :label="t('login.registerForm.lastName')" v-model="form.lastName" :rules="form.lastNameRules" />
    <v-text-field
      variant="underlined"
      density="compact"
      name="email"
      :label="t('login.registerForm.email')"
      v-model="form.uid"
      :rules="form.uidRules" />
    <v-text-field name="password" :label="t('login.registerForm.password')" v-model="form.password" :rules="form.passwordRules" />
    <v-text-field
      name="confirmPassword"
      :label="t('login.registerForm.confirmPassword')"
      v-model="form.confirmPassword"
      :rules="form.confirmPasswordRules" />
    <v-checkbox name="termsAndConditions" v-model="form.termsAndConditions" :rules="form.termsAndConditionsRules">
      <template v-slot:label>
        <span v-html="t('login.registerForm.termsAndConditions')" />
      </template>
    </v-checkbox>
    <v-btn block size="large" variant="tonal" :disabled="!form.valid">{{ t('login.registerForm.register') }}</v-btn>
  </v-form>
</template>
<script setup lang="ts">
  import { useUserStore } from '@/user'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { VForm } from 'vuetify/components'

  const userStore = useUserStore()
  const { titles } = storeToRefs(userStore)
  const { t } = useI18n()
  const form = ref({
    valid: false,
    titleCode: '',
    titleCodeRules: [(v: string) => !!v],
    firstName: '',
    firstNameRules: [(v: string) => !!v],
    lastName: '',
    lastNameRules: [(v: string) => !!v],
    uid: '',
    uidRules: [(v: string) => !!v],
    password: '',
    passwordRules: [(v: string) => !!v],
    confirmPassword: '',
    confirmPasswordRules: [(v: string) => !!v],
    termsAndConditions: false,
    termsAndConditionsRules: [(v: string) => !!v]
  })

  const register = () => {}
</script>
