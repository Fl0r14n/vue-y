import type { DirectiveBinding, Ref } from 'vue'

const camelCaseToDash = (myStr: string): string => {
  const regExp = /([a-z])([A-Z])/g
  return myStr.replace(regExp, '$1-$2').toLowerCase()
}

export const cmsData = (el: any, binding: DirectiveBinding | Ref) => {
  const { value } = binding
  if (value) {
    Object.keys(value).forEach(key => {
      Object.keys(value[key]).forEach(propertyKey => {
        if (propertyKey === 'classes') {
          value[key][propertyKey].split(' ').forEach((className: string) => {
            el.classList.add(className)
          })
        } else {
          el.setAttribute(`data-${camelCaseToDash(key)}-${camelCaseToDash(propertyKey)}`, value[key][propertyKey])
        }
      })
    })
  }
}
