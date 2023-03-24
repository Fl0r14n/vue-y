import type { RequestData, SaveCartResultData } from '@/api/models'

export class SaveCartResource extends CartEndpoint {
  /**
   * Explicitly clones a cart
   * @param {string} cartId
   * @param {{name?: string; description?: string} & RequestData} cloneOptions
   */
  cloneCart(
    cartId = 'current',
    cloneOptions: {
      /**
       * the name that should be applied to the cloned cart
       */
      name?: string
      /**
       * the description that should be applied to the cloned cart
       */
      description?: string
    } & RequestData
  ) {
    return this.postAt<SaveCartResultData>(`${cartId}/clonesavedcart`, {}, { params: cloneOptions })
  }

  /**
   * Flags a cart for deletion (the cart doesn't have corresponding save cart attributes anymore).<br/>
   * The cart is not actually deleted from the database.
   * But with the removal of the saved cart attributes, this cart will be taken care of by the cart removal job just like any other cart.
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  flagCartForDeletion(cartId = 'current', queryParams?: RequestData) {
    return this.patch<SaveCartResultData>(`${cartId}/flagForDeletion`, {}, { params: queryParams })
  }

  /**
   * Restore a saved cart
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  restoreCart(cartId = 'current', queryParams?: RequestData) {
    return this.patch<SaveCartResultData>(`${cartId}/restoresavedcart`, {}, { params: queryParams })
  }

  /**
   * Explicitly saves a cart
   * @param {string} cartId
   * @param {{saveCartName: string; saveCartDescription?: string} & RequestData} details
   */
  saveCart(
    cartId = 'current',
    details: {
      saveCartName?: string
      saveCartDescription?: string
    } & RequestData
  ) {
    return this.patch<SaveCartResultData>(`${cartId}/save`, {}, { params: details })
  }

  /**
   * Returns saved cart by it id for authenticated user
   * @param {string} cartId
   * @param {RequestData} queryParams
   */
  getSavedCart(cartId = 'current', queryParams?: RequestData) {
    return this.get<SaveCartResultData>(`${cartId}/savedcart`, { params: queryParams })
  }
}
