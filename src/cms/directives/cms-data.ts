import type { DirectiveBinding } from 'vue'

export const cmsData = (el: any, binding: DirectiveBinding) => {
  const { value } = binding
  if (value) {
    Object.keys(value).forEach(key => {
      Object.keys(value[key]).forEach(propertyKey => {
        if (propertyKey === 'classes') {
          value[key][propertyKey].split(' ').forEach((className: string) => {
            //TODO
            // this.renderer.addClass(
            //   (selector && this.browserRef.document.querySelector(selector)) || this.el.nativeElement.parentNode,
            //   className
            // )
          })
        } else {
          // this.renderer.setAttribute(
          //   (selector && selector) || this.el.nativeElement.parentNode,
          //   `data-${camelCaseToDash(key)}-${camelCaseToDash(propertyKey)}`,
          //   properties[key][propertyKey]
          // )
        }
      })
    })
  }
}
