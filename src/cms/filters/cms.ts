import { injectCmsComponent, injectCmsTemplate } from '@/config'
import { defineAsyncComponent, markRaw } from 'vue'

export const getTemplate = (template: string, uid?: string) => {
  const injected = injectCmsTemplate(template, uid)
  const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
  return (
    (instance && markRaw(instance)) || console.warn(`CMS template identified by ID: ${uid} and/or Template: ${template} was not found `)
  )
}

export const getComponent = (typeCode: string, uid?: string) => {
  const injected = injectCmsComponent(typeCode, uid)
  const instance = (typeof injected === 'function' && defineAsyncComponent(injected)) || injected
  return (
    (instance && markRaw(instance)) || console.warn(`CMS components identified by ID: ${uid} and/or TypeCode: ${typeCode} was not found`)
  )
}
