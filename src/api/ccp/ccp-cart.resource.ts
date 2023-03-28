import { getCartRest } from '@/api/b2c'
import type { CartModificationData, CCPConfigurationData, CCPOrderEntryData } from '@/api/models'
import { inject } from '@/config'

export abstract class CcpCartResource {
  getConfigForCartEntry!: (cartId: string, entryNumber: string) => Promise<CCPConfigurationData>
  updateConfigForCartEntry!: (cartId: string, entryNumber: string, entry: CCPOrderEntryData) => Promise<CartModificationData>
  addEntryWithConfigToCart!: (cartId: string, entry: CCPOrderEntryData) => Promise<CartModificationData>
}

const ccpCartResource = (): CcpCartResource => {
  const rest = getCartRest()
  return {
    getConfigForCartEntry: (cartId = 'current', entryNumber: string) =>
      rest.get<CCPConfigurationData>(`${cartId}/entries/${entryNumber}/ccpconfigurator`),
    updateConfigForCartEntry: (cartId = 'current', entryNumber: string, entry: CCPOrderEntryData) =>
      rest.put<CartModificationData>(`${cartId}/entries/${entryNumber}/ccpconfigurator`, entry),
    addEntryWithConfigToCart: (cartId = 'current', entry: CCPOrderEntryData) =>
      rest.postAt<CartModificationData>(`${cartId}/entries/ccpconfigurator`, entry)
  }
}

export const useCcpCartResource = () => inject(CcpCartResource, ccpCartResource())
