<template>
  <v-carousel v-model="model" hide-delimiter-background show-arrows="hover" v-if="items?.length" :height="height">
    <template v-for="(item, index) of items">
      <template v-if="item">
        <v-carousel-item v-if="(index + 1) % columns === 1 || columns === 1" :key="index">
          <v-row class="flex-nowrap">
            <template v-for="(n, i) in columns">
              <template v-if="+index + i < items.length">
                <v-col :key="i">
                  <slot :item="items[+index + i]" />
                </v-col>
              </template>
            </template>
          </v-row>
        </v-carousel-item>
      </template>
    </template>
  </v-carousel>
</template>
<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useDisplay } from 'vuetify'

  defineProps<{ items?: any[]; height?: string }>()
  const { name } = useDisplay()
  const model = ref<number>(0)
  const columns = computed(() => {
    switch (name.value) {
      case 'xxl':
        return 5
      case 'xl':
        return 4
      case 'lg':
        return 3
      case 'md':
        return 2
      default:
        return 1
    }
  })
</script>
