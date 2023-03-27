import type { RequestData, VoucherData } from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getVoucherRest = () => {
  const { sitePath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/vouchers`))
}

export abstract class VoucherResource {
  getVoucher!: (code: string, queryParams?: RequestData) => Promise<VoucherData>
}

const voucherResource = (): VoucherResource => {
  const rest = getVoucherRest()
  return {
    getVoucher: (code: string, queryParams?: RequestData) => rest.get<VoucherData>(code, { params: queryParams })
  }
}

export const useVoucherResource = () => inject(VoucherResource, voucherResource())
