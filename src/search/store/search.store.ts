import { defineStore } from 'pinia'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const useSearchStore = defineStore('SearchStore', () => {})

export const categoryGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  return next()
}

export const searchGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  return next()
}
