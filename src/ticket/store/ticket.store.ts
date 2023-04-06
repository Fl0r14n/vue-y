import {
  FieldLevelMapping,
  type TicketData,
  type TicketEventData,
  type TicketListData,
  type TicketStarterData,
  usePageable,
  useTicketResource
} from '@/api'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export const useTicketStore = defineStore('TicketStore', () => {
  const ticketResource = useTicketResource()
  const { request, sort, pageSize, currentPage } = usePageable({
    pageSize: 20,
    currentPage: 0
  })
  const ticketPage = ref<TicketListData>()
  const tickets = computed(() => ticketPage.value?.tickets)
  const sorts = computed(() => ticketPage.value?.sorts)
  const pagination = computed(() => ticketPage.value?.pagination)
  const ticket = ref<TicketData>()
  const id = computed({
    get: () => ticket.value?.id,
    set: async id => {
      id &&
        (ticket.value = await ticketResource.getTicket(id, {
          fields: FieldLevelMapping.FULL
        }))
    }
  })

  watch(request, () => load())

  const create = async (body: TicketStarterData) => {
    ticket.value = await ticketResource.addTicket(body, {
      fields: FieldLevelMapping.FULL
    })
    await load()
  }

  const addEvent = async (event: TicketEventData) => {
    const { value } = id
    if (value) {
      await ticketResource.addTicketEvent(value, event)
      id.value = value //refresh
      await load()
    }
  }

  const load = async () => {
    ticketPage.value = await ticketResource.getTickets({
      fields: FieldLevelMapping.FULL,
      ...request.value
    })
  }

  return {
    ticketPage,
    tickets,
    sorts,
    pagination,
    ticket,
    id,
    create,
    addEvent,
    sort,
    pageSize,
    currentPage
  }
})
