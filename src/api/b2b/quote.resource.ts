import type {
  CreateCommentData,
  QuoteActionData,
  QuoteData,
  QuoteDiscountData,
  QuoteListData,
  QuoteMetadataData,
  QuoteStarterData,
  RequestData,
  SortableRequestData
} from '@/api/models'
import { AuthRestClient } from '@/api/rest'

export abstract class QuoteEndpoint extends AuthRestClient {
  getEndpoint() {
    return `${this.basePath}/users/${this.userPath}/quotes/`
  }
}

export class QuoteResource extends QuoteEndpoint {
  /**
   * Returns history data for all quotes requested by a specified user for a specified base store.<br/>
   * The response can display the results across multiple pages, if required.
   * @param {SortableRequestWsDTO} queryParams
   */
  getQuotes(queryParams?: SortableRequestData) {
    return this.query<QuoteListData>({ params: queryParams })
  }

  /**
   * Creates new quote - by cartId for creating a new quote from the cart,
   * by quoteCode for the requote action<br/>
   * In the edit state, the quote can be requested via cartId,<br/>
   * the current content of a cart will be then linked with the quote.<br/>
   * The requote action can be triggered by providing the quoteCode parameter,<br/>
   * instead of cartId inside the body. The response will contain the new quote's data.<br/>
   * @param {RequestData} queryParams
   * @param {QuoteStarterData} quote
   */
  addQuote(quote: QuoteStarterData, queryParams?: RequestData) {
    return this.post<QuoteData>(quote, { params: queryParams })
  }

  /**
   * Returns quote details based on a specific quote code. The response contains detailed quote information
   * @param {RequestData} queryParams
   * @param {string} quoteCode
   */
  getQuote(quoteCode: string, queryParams?: RequestData) {
    return this.get<QuoteData>(`${quoteCode}`, { params: queryParams })
  }

  /**
   * Updates name, description or expiry date of the quote.
   * @param {QuoteMetadataData} body
   * @param {string} quoteCode
   */
  setQuote(quoteCode: string, body: QuoteMetadataData) {
    return this.patch<void>(`${quoteCode}`, body)
  }

  /**
   * Perform cancel, submit, edit, checkout, approve, reject actions with the quote.
   * @param {QuoteActionData} quoteAction
   * @param {string} quoteCode
   */
  setQuoteStatus(quoteCode: string, quoteAction?: QuoteActionData) {
    return this.postAt<void>(`${quoteCode}/action`, quoteAction)
  }

  /**
   * Adds a comment to the quote
   * @param {CreateCommentData} comment
   * @param {string} quoteCode
   */
  addQuoteComment(quoteCode: string, comment: CreateCommentData) {
    return this.postAt<void>(`${quoteCode}/comments`, comment)
  }

  /**
   * Apply a discount to an existing quote.
   * In the edit state, a seller can apply a discount to a quote.
   * Type of the discount - PERCENT for discount by percentage,
   * ABSOLUTE for discount by amount,
   * TARGET for discount by adjustment of the total value
   * @param {QuoteDiscountData} quoteDiscount
   * @param {string} quoteCode
   */
  addQuoteDiscount(quoteCode: string, quoteDiscount: QuoteDiscountData) {
    return this.postAt<void>(`${quoteCode}/discounts`, quoteDiscount)
  }

  /**
   * Add a comment to a line item of a quote.
   * @param {CreateCommentData} comment
   * @param {string} quoteCode
   * @param {string} entryNumber
   */
  addQuoteEntryComment(quoteCode: string, entryNumber: string, comment: CreateCommentData) {
    return this.postAt<void>(`${quoteCode}/entries/${entryNumber}/comments`, comment)
  }
}
