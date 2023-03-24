import type { RequestData, VoucherData } from '@/api/models'
import { RestClient } from '@/api/rest'

export class VoucherResource extends RestClient {
  getEndpoint() {
    return `${this.basePath}/vouchers`
  }

  /**
   * Returns details of a single voucher according to a voucher code.
   * @param {string} code. Voucher identifier (code)
   * @param {RequestData} queryParams
   */
  getVoucher(code: string, queryParams?: RequestData) {
    return this.get<VoucherData>(code, { params: queryParams })
  }
}
