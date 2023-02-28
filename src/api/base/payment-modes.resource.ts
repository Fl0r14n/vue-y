import type { PaymentModeListData, RequestData } from '@/api/models'
import { useRestClient } from '@/api/rest'
import type { App } from 'vue'
import { inject } from 'vue'

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

export const createPaymentModesResource = () => ({
  install(app: App) {
    app.provide(PaymentModesResource.name, paymentModesResource())
  }
})

export const usePaymentModesResource = () => inject<PaymentModesResource>(PaymentModesResource.name)!
