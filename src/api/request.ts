import type { QueryRequestData, SortableRequestData } from '@/api/models'
import { computed, ref } from 'vue'

export const usePageable = <T extends SortableRequestData>() => {
  const request = ref<T>()
  const sort = computed({
    get: () => request.value?.sort,
    set: sort => request.value && (request.value.sort = sort)
  })
  const pageSize = computed({
    get: () => request.value?.pageSize,
    set: pageSize => request.value && (request.value.pageSize = pageSize)
  })
  const currentPage = computed({
    get: () => request.value?.currentPage,
    set: currentPage => request.value && (request.value.currentPage = currentPage)
  })
  return {
    request,
    sort,
    pageSize,
    currentPage
  }
}

export const useQueryable = () => {
  const { request, sort, pageSize, currentPage } = usePageable<QueryRequestData>()
  const query = computed({
    get: () => request.value?.query,
    set: query => {
      if (query) {
        const qel = query.split(':')
        request.value = {
          ...request.value,
          currentPage: 0,
          query,
          ...((qel.length > 1 && { sort: qel[1] }) || {})
        }
      }
    }
  })
  return {
    request,
    sort,
    pageSize,
    currentPage,
    query
  }
}
