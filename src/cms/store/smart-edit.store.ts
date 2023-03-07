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

//manually init it since won't be present in time
window.smartedit = window.smartedit || ({} as any)

export const loadScript = (props: { src: string; attrs?: Record<string, string>; el?: Element }) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const { attrs } = props
    attrs &&
      Object.keys(attrs).forEach(
        key => (key.startsWith('data-') && script.setAttribute(key, attrs[key])) || ((script as any)[key] = attrs[key])
      )
    script.addEventListener('load', resolve)
    script.addEventListener('error', reject)
    script.src = props.src
    script.async = true
    script.defer = true
    ;(props.el && props.el.appendChild(script)) || document.body.appendChild(script)
  })

export const useSmartEditStore = defineStore('SmartEditStore', () => {
  const config = useSmartEditConfig()
  const component = ref<{ componentId: string; componentType?: string; parentId?: string }>()

  const hookToSmartEdit = () => {
    const { smartedit } = window
    if (smartedit) {
      smartedit.reprocessPage = () => {}
      smartedit.renderComponent = (componentId: string, componentType?: string, parentId?: string) => {
        component.value = { componentId, componentType, parentId }
        return true
      }
    }
  }

  watch(
    config,
    async c => {
      await loadScript({
        src: c?.scriptPath || '/webApplicationInjector.js',
        attrs: {
          id: 'smartedit-injector',
          'data-smartedit-allow-origin': c?.allowOrigin || ''
        }
      })
      // manually since load event was already triggered
      parent.postMessage(
        {
          pk: Math.random(),
          gatewayId: 'smartEditBootstrap',
          eventId: 'bootstrapSmartEdit',
          data: { location: document.location.href }
        },
        '*'
      )
      hookToSmartEdit()
    },
    { immediate: true }
  )
  return {
    component
  }
})
