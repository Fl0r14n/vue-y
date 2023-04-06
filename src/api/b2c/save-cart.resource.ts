import { getCartRest } from '@/api'
import type { RequestData, SaveCartResultData } from '@/api/models'
import { inject } from '@/config'

export abstract class SaveCartResource {
  cloneCart!: (
    cartId: string,
    cloneOptions: {
      name?: string
      description?: string
    } & RequestData
  ) => Promise<SaveCartResultData>
  flagCartForDeletion!: (cartId: string, queryParams?: RequestData) => Promise<SaveCartResultData>
  restoreCart!: (cartId: string, queryParams?: RequestData) => Promise<SaveCartResultData>
  saveCart!: (
    cartId: string | undefined,
    details: {
      saveCartName?: string
      saveCartDescription?: string
    } & RequestData
  ) => Promise<SaveCartResultData>
  getSavedCart!: (cartId: string, queryParams?: RequestData) => Promise<SaveCartResultData>
}

const saveCartResource = (): SaveCartResource => {
  const rest = getCartRest()
  return {
    cloneCart: (
      cartId = 'current',
      cloneOptions: {
        name?: string
        description?: string
      } & RequestData
    ) => rest.postAt<SaveCartResultData>(`${cartId}/clonesavedcart`, {}, { params: cloneOptions }),
    flagCartForDeletion: (cartId = 'current', queryParams?: RequestData) =>
      rest.patch<SaveCartResultData>(`${cartId}/flagForDeletion`, {}, { params: queryParams }),
    restoreCart: (cartId = 'current', queryParams?: RequestData) =>
      rest.patch<SaveCartResultData>(`${cartId}/restoresavedcart`, {}, { params: queryParams }),
    saveCart: (
      cartId = 'current',
      details: {
        saveCartName?: string
        saveCartDescription?: string
      } & RequestData
    ) => rest.patch<SaveCartResultData>(`${cartId}/save`, {}, { params: details }),
    getSavedCart: (cartId = 'current', queryParams?: RequestData) =>
      rest.get<SaveCartResultData>(`${cartId}/savedcart`, { params: queryParams })
  }
}

export const useSaveCartResource = () => inject(SaveCartResource, saveCartResource())
