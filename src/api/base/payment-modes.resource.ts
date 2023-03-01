import { inject } from '@/api'
import type { PaymentModeListData, RequestData } from '@/api/models'
import { useRestClient } from '@/api/rest'

export abstract class PaymentModesResource {
  getPaymentModes!: (queryParams?: RequestData) => Promise<PaymentModeListData>
}

const paymentModesResource = (): PaymentModesResource => {
  const rest = useRestClient()
  rest.endpoint.value = `${rest.sitePath}/paymentmodes`
  return {
    getPaymentModes: (queryParams?: RequestData) => rest.query<PaymentModeListData>({ params: queryParams })
  }
}

export const usePaymentModesResource = () => inject(PaymentModesResource, paymentModesResource())
