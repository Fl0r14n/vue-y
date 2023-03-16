<template>
  <v-app :theme="theme" :class="themePipe()">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="mdAndDown"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <cms-slot position="SiteLogo" v-slot="{ data }">
          <div class="d-flex" v-for="d in data" :key="d.uid" style="height: 40px" v-cms-data="d.properties">
            <component :is="getComponent(d.typeCode, d.uid)" v-bind="{ ...d, styleClasses: 'h-100' }" />
          </div>
        </cms-slot>
      </v-app-bar-title>
      <template v-slot:append>
        <v-btn icon="mdi-magnify" />
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="theme = theme === 'light' ? 'dark' : 'light'"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
        <v-oauth :state="'somme_dummy_state'" :type="type" :use-logout-url="true" :responseType="responseType" />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="bottom" v-if="mdAndDown">
      <v-list color="transparent">
        <v-list-item></v-list-item>
        <cms-slot position="HeaderLinks" />
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
        <cms-slot position="NavigationBar" />
        <cms-slot position="BottomHeaderSlot" />
        <cms-slot position="MiniCart" />
        <cms-slot position="SiteLinks" />
        <cms-slot position="SearchBox" />
        <RouterView />
      </v-container>
    </v-main>
    <cms-slot position="Footer" class="text-center" />
  </v-app>
</template>

<script setup lang="ts">
  import { getComponent, themePipe } from '@/cms'
  import CmsSlot from '@/cms/components/CmsSlot.vue'
  import { OAuthType } from '@/oauth/models'
  import { ref } from 'vue'
  import { useDisplay, useTheme } from 'vuetify'

  const type = OAuthType.RESOURCE
  // const responseType = 'code token id_token'
  const responseType = 'code'

  const theme = useTheme().name
  const drawer = ref(false)

  const { mdAndDown } = useDisplay()
</script>
