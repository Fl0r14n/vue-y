<template>
  <v-menu v-model="menu" rounded :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" :icon="isLogin ? 'mdi-account' : 'mdi-account-outline'"></v-btn>
    </template>

    <cms-slot position="HeaderLinks" v-slot="{ data }">
      <v-list>
        <v-list-item :title="user.name" :subtitle="user.email">
          <template #prepend>
            <v-avatar color="primary">
              <v-img :src="user.picture" v-if="user.picture"></v-img>
              <span class="text-h5" v-else v-html="user.initials"></span>
            </v-avatar>
          </template>
        </v-list-item>
        <v-list-item :to="{ name: 'login' }" :link="true" :text="'Login'"></v-list-item>
      </v-list>
    </cms-slot>
  </v-menu>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/user'
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'

  const { isLogin, user } = storeToRefs(useUserStore())

  watch(isLogin, l => console.log('HERE', l))

  const menu = ref(false)
</script>
