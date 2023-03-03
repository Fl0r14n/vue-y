import { defineStore } from 'pinia'
import { ref } from 'vue'

declare global {
  interface Window {
    smartedit?: {
      reprocessPage: () => any
      renderComponent: (componentId: string, componentType: string, parentId: string) => boolean
    }
  }
}

export const useSmartEditStore = defineStore('SmartEditStore', () => {
  const { smartedit } = window || {}
  const component = ref<{ componentId?: string; componentType?: string; parentId?: string }>()
  if (smartedit) {
    smartedit.reprocessPage = () => {}
    smartedit.renderComponent = (componentId: string, componentType: string, parentId: string) => {
      component.value = { componentId, componentType, parentId }
      return true
    }
  }
  return {
    component
  }
})
