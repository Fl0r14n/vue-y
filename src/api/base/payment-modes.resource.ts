import type { PaymentModeListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class PaymentModesResource {
  getPaymentModes!: (queryParams?: RequestData) => Promise<PaymentModeListData>
}

const paymentModesResource = (): PaymentModesResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath}/paymentmodes`))
  return {
    getPaymentModes: (queryParams?: RequestData) => rest.query<PaymentModeListData>({ params: queryParams })
  }
}

export const usePaymentModesResource = () => inject(PaymentModesResource, paymentModesResource())
