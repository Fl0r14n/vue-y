<template>
  <v-btn icon="mdi-account-outline" :to="{ name: 'login' }" v-if="!isLogin" />
  <v-menu v-model="menu" rounded :close-on-content-click="false" location="bottom" v-else>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon="mdi-account" />
    </template>

    <cms-slot position="HeaderLinks" v-slot="{ data }">
      <v-list>
        <v-list-item :title="user.name" :subtitle="user.uid">
          <template v-slot:prepend>
            <v-avatar color="primary" v-if="user.uid">
              <v-img :src="user.picture" v-if="user.picture"></v-img>
              <span class="text-h5" v-else v-html="getInitials(user)"></span>
            </v-avatar>
          </template>
          <template v-slot:append>
            <v-btn icon="mdi-logout" variant="text" :to="{ name: 'logout' }" />
          </template>
        </v-list-item>
      </v-list>
    </cms-slot>
  </v-menu>
</template>

<script setup lang="ts">
  import type { UserData } from '@/api'
  import { useUserStore } from '@/user'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const { isLogin, user } = storeToRefs(useUserStore())

  const menu = ref(false)

  const getInitials = (user: UserData) => `${user.firstName?.charAt(0)}${user.lastName?.charAt(0)}`
</script>
