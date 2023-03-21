<template>
  <v-app :theme="theme" :class="themePipe()">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="mobile"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <div class="d-flex align-center">
          <cms-slot position="SiteLogo" v-slot="{ data }">
            <div class="d-flex" v-for="d in data" :key="d.uid" style="height: 40px" v-cms-data="d.properties">
              <component :is="getComponent(d.typeCode, d.uid)" v-bind="{ ...d, styleClasses: 'h-100' }" />
            </div>
          </cms-slot>
          <cms-slot position="SiteContext" class="d-flex" v-slot="{ data }" v-if="!mobile">
            <div class="d-flex px-3" v-for="d in data" :key="d.uid" v-cms-data="d.properties">
              <component :is="getComponent(d.typeCode, d.uid)" v-bind="d" />
            </div>
          </cms-slot>
        </div>
      </v-app-bar-title>
      <template v-slot:append>
        <cms-slot position="SearchBox" />
        <cms-slot position="MiniCart" />
        <v-menu v-if="!mobile">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" v-bind="props" />
          </template>
          <v-list density="compact">
            <cms-slot position="SiteLinks" v-slot="{ data }">
              <v-list-item :link="d.typeCode === 'CMSLinkComponent'" v-for="d in data" :key="d.uid" v-cms-data="d.properties">
                <v-list-item-title>
                  <component :is="getComponent(d.typeCode, d.uid)" v-bind="d" />
                </v-list-item-title>
              </v-list-item>
            </cms-slot>
          </v-list>
        </v-menu>
        <v-oauth :state="'somme_dummy_state'" :type="type" :use-logout-url="true" :responseType="responseType" />
        <v-btn
          :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="theme = theme === 'light' ? 'dark' : 'light'"></v-btn>
      </template>
      <template v-slot:extension v-if="!mobile">
        <cms-slot position="NavigationBar" class="w-100 d-flex justify-center" />
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" location="bottom" v-if="mobile">
      <v-list color="transparent">
        <v-list-item></v-list-item>
        <cms-slot position="HeaderLinks" />
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
        <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
        <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block> Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <slot />
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

  const { mobile } = useDisplay()
</script>
