import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class MerchantCallbackResource {
  verifyMerchantCallback?: () => Promise<void | any>
  verifyCartCallback?: (cartId: string) => Promise<void | any>
}

const merchantCallbackResource = (): MerchantCallbackResource => {
  const { sitePath, userPath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/integration`))
  return {
    verifyMerchantCallback: () => rest.postAt<void>('merchant_callback', {}),
    verifyCartCallback: (cartId: string) => rest.postAt<void>(`users/${userPath.value}/carts/${cartId}/payment/sop/response`, {})
  }
}

export const useMerchantCallbackResource = () => inject(MerchantCallbackResource, merchantCallbackResource())
