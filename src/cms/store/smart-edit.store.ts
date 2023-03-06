import { useSmartEditConfig } from '@/config'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

declare global {
  interface Window {
    smartedit?: {
      reprocessPage: () => any
      renderComponent: (componentId: string, componentType: string, parentId: string) => boolean
    }
  }
}

export const loadScript = (props: { src: string; attrs?: Record<string, string>; el?: Element }) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = props.src
    script.defer = true
    script.async = true
    const { attrs } = props
    attrs &&
      Object.keys(attrs).forEach(
        key => (key.startsWith('data-') && script.setAttribute(key, attrs[key])) || ((script as any)[key] = attrs[key])
      )
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    ;(props.el && props.el.appendChild(script)) || document.body.appendChild(script)
  })

export const useSmartEditStore = defineStore('SmartEditStore', () => {
  const config = useSmartEditConfig()
  const component = ref<{ componentId: string; componentType?: string; parentId?: string }>()

  watch(
    config,
    async c => {
      console.log(Date.now(), c)
      await loadScript({
        src: c?.scriptPath || '/webApplicationInjector.js',
        attrs: {
          id: 'smartedit-injector',
          'data-smartedit-allow-origin': c?.allowOrigin || ''
        }
      })
      console.log(Date.now(), window)
      const { smartedit } = window || {}
      if (smartedit) {
        console.log('HERE-------------------------------------------')
        smartedit.reprocessPage = () => {}
        smartedit.renderComponent = (componentId: string, componentType?: string, parentId?: string) => {
          component.value = { componentId, componentType, parentId }
          return true
        }
      }
    },
    { immediate: true }
  )
  return {
    component
  }
})
