<template>
  <v-app :theme="theme">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="mdAndDown"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>ngx-y</v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-magnify" />
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="theme = theme === 'light' ? 'dark' : 'light'"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
        <OAuthLogin :state="'somme_dummy_state'" :type="OAuthType.AUTHORIZATION_CODE" :use-logout-url="true" />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="bottom" v-if="mdAndDown">
      <v-list color="transparent">
        <v-list-item></v-list-item>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
    <v-footer border style="flex: none">
      <v-row justify="center" no-gutters>
        <v-btn v-for="link in links" :key="link" variant="text" class="mx-2" rounded="xl">
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12"> {{ new Date().getFullYear() }} — <strong>ngx-y</strong> </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
  import { OAuthType } from '@/oauth'
  import OAuthLogin from '@/oauth/OAuthLogin.vue'
  import { ref } from 'vue'
  import { useDisplay, useTheme } from 'vuetify'

  const theme = useTheme().name
  const drawer = ref(false)

  const { mdAndDown } = useDisplay()

  const links = ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us']
</script>
