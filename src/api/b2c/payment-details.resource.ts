import type { PaymentDetailsData, PaymentDetailsListData, RequestData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getPaymentDetailsRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/paymentdetails`))
}

export abstract class PaymentDetailsResource {
  getPaymentDetails!: (
    queryParams?: {
      saved?: boolean
    } & RequestData
  ) => Promise<PaymentDetailsListData>
  getPaymentDetail!: (paymentDetailsId: string, queryParams?: RequestData) => Promise<PaymentDetailsData>
  setPaymentDetail!: (paymentDetailsId: string, paymentDetail: PaymentDetailsData, queryParams?: RequestData) => Promise<void>
  delPaymentDetail!: (paymentDetailsId: string) => Promise<void>
}

const paymentDetailsResource = (): PaymentDetailsResource => {
  const rest = getPaymentDetailsRest()
  return {
    getPaymentDetails: (
      queryParams?: {
        saved?: boolean
      } & RequestData
    ) => rest.query<PaymentDetailsListData>({ params: queryParams }),
    getPaymentDetail: (paymentDetailsId: string, queryParams?: RequestData) =>
      rest.get<PaymentDetailsData>(paymentDetailsId, { params: queryParams }),
    setPaymentDetail: (paymentDetailsId: string, paymentDetail: PaymentDetailsData, queryParams?: RequestData) =>
      rest.patch<void>(paymentDetailsId, paymentDetail, { params: queryParams }),
    delPaymentDetail: (paymentDetailsId: string) => rest.del<void>(paymentDetailsId)
  }
}

export const usePaymentDetailsResource = inject(PaymentDetailsResource, paymentDetailsResource())
