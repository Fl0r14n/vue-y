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
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export const getQuoteRest = () => {
  const { sitePath, userPath } = useRestContext()
  return useRestClient(computed(() => `${sitePath.value}/users/${userPath.value}/quotes`))
}

export abstract class QuoteResource {
  getQuotes!: (queryParams?: SortableRequestData) => Promise<QuoteListData>
  addQuote!: (quote: QuoteStarterData, queryParams?: RequestData) => Promise<QuoteData>
  getQuote!: (quoteCode: string, queryParams?: RequestData) => Promise<QuoteData>
  setQuote!: (quoteCode: string, body: QuoteMetadataData) => Promise<void>
  setQuoteStatus!: (quoteCode: string, quoteAction?: QuoteActionData) => Promise<void>
  addQuoteComment!: (quoteCode: string, comment: CreateCommentData) => Promise<void>
  addQuoteDiscount!: (quoteCode: string, quoteDiscount: QuoteDiscountData) => Promise<void>
  addQuoteEntryComment!: (quoteCode: string, entryNumber: string, comment: CreateCommentData) => Promise<void>
}

const quoteResource = (): QuoteResource => {
  const rest = getQuoteRest()
  return {
    getQuotes: (queryParams?: SortableRequestData) => rest.query<QuoteListData>({ params: queryParams }),
    addQuote: (quote: QuoteStarterData, queryParams?: RequestData) => rest.post<QuoteData>(quote, { params: queryParams }),
    getQuote: (quoteCode: string, queryParams?: RequestData) => rest.get<QuoteData>(`${quoteCode}`, { params: queryParams }),
    setQuote: (quoteCode: string, body: QuoteMetadataData) => rest.patch<void>(`${quoteCode}`, body),
    setQuoteStatus: (quoteCode: string, quoteAction?: QuoteActionData) => rest.postAt<void>(`${quoteCode}/action`, quoteAction),
    addQuoteComment: (quoteCode: string, comment: CreateCommentData) => rest.postAt<void>(`${quoteCode}/comments`, comment),
    addQuoteDiscount: (quoteCode: string, quoteDiscount: QuoteDiscountData) => rest.postAt<void>(`${quoteCode}/discounts`, quoteDiscount),
    addQuoteEntryComment: (quoteCode: string, entryNumber: string, comment: CreateCommentData) =>
      rest.postAt<void>(`${quoteCode}/entries/${entryNumber}/comments`, comment)
  }
}

export const useQuoteResource = () => inject(QuoteResource, quoteResource())
