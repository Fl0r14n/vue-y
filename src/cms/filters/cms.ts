import { injectCmsComponent, injectCmsTemplate } from '@/config'
import { defineAsyncComponent, markRaw } from 'vue'

export const getTemplate = (template: string, uid?: string) => {
  const injected = injectCmsTemplate(template, uid)
  const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
  return markRaw(instance)
}

export const getComponent = (typeCode: string, uid?: string) => {
  const injected = injectCmsComponent(typeCode, uid)
  const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
  return markRaw(instance)
}
