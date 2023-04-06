import type {
  CreateCommentData,
  QuoteActionData,
  QuoteData,
  QuoteDiscountData,
  QuoteListData,
  QuoteMetadataData,
  QuoteStarterData
} from '@/api'
import { FieldLevelMapping, usePageable, useQuoteResource } from '@/api'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useQuoteStore = defineStore('QuoteStore', () => {
  const quoteResource = useQuoteResource()
  const { request, pageSize, sort, currentPage } = usePageable()
  const quotesPage = ref<QuoteListData>()
  const quotes = computed(() => quotesPage.value?.quotes)
  const pagination = computed(() => quotesPage.value?.pagination)
  const quote = ref<QuoteData>()
  const code = computed({
    get: () => quote.value?.code,
    set: async code => {
      code &&
        (quote.value = await quoteResource.getQuote(code, {
          fields: FieldLevelMapping.FULL
        }))
    }
  })

  watch(request, () => load(), { deep: true })

  const load = async () => {
    quotesPage.value = await quoteResource.getQuotes({
      fields: FieldLevelMapping.FULL,
      ...request.value
    })
  }

  const create = async (body: QuoteStarterData) => {
    const result = await quoteResource.addQuote(body)
    quote.value = result
    await load()
    return result
  }

  const update = async (body: QuoteMetadataData) => {
    const { value } = code
    if (value) {
      await quoteResource.setQuote(value, body)
      code.value = value //refresh
      await load()
    }
  }

  const setStatus = async (quoteAction: QuoteActionData) => {
    const { value } = code
    if (value) {
      await quoteResource.setQuoteStatus(value, quoteAction)
      code.value = value
      await load()
    }
  }

  const addComment = async (comment: CreateCommentData) => {
    const { value } = code
    if (value) {
      await quoteResource.addQuoteComment(value, comment)
      code.value = value
      await load()
    }
  }

  const addDiscount = async (quoteDiscount: QuoteDiscountData) => {
    const { value } = code
    if (value) {
      await quoteResource.addQuoteDiscount(value, quoteDiscount)
      code.value = value
      await load()
    }
  }

  const addEntryComment = async (entryNumber: string, comment: CreateCommentData) => {
    const { value } = code
    if (value) {
      await quoteResource.addQuoteEntryComment(value, entryNumber, comment)
      code.value = value
      await load()
    }
  }

  return {
    sort,
    pageSize,
    currentPage,
    quotesPage,
    quotes,
    pagination,
    quote,
    code,
    create,
    update,
    setStatus,
    addComment,
    addDiscount,
    addEntryComment
  }
})
