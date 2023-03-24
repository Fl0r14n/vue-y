import type {
  ConversationData,
  ConversationListData,
  ConversationMessageData,
  ConversationMessageListData,
  ConversationRequestData
} from '@/api/models'
import { useRestClient, useRestContext } from '@/api/rest'
import { inject } from '@/config'
import { computed } from 'vue'

export abstract class MessageCenterResource {
  send?: (conversationId: string, messages: ConversationMessageData[]) => Promise<ConversationData>
  close?: (conversationId: string) => Promise<ConversationData>
  messages?: (conversationId: string) => Promise<ConversationMessageListData>
  pick?: (conversationId: string) => Promise<ConversationData>
  agentConversations?: (queryParams?: ConversationRequestData) => Promise<ConversationListData>
  customerConversations?: () => Promise<ConversationListData>
}

const messageCenterResource = (): MessageCenterResource => {
  const { sitePath } = useRestContext()
  const rest = useRestClient(computed(() => `${sitePath.value}/messagecenter/im/conversations`))
  return {
    send: (conversationId: string, messages: ConversationMessageData[]) =>
      rest.post<ConversationData>({
        conversationId,
        messages
      }),
    close: (conversationId: string) => rest.patch<ConversationData>(`${conversationId}/close`, {}),
    messages: (conversationId: string) => rest.get<ConversationMessageListData>(`${conversationId}/messages`),
    pick: (conversationId: string) => rest.patch<ConversationData>(`${conversationId}/pick`, {}),
    agentConversations: (queryParams?: ConversationRequestData) =>
      rest.get<ConversationListData>(`agentconversations`, { params: queryParams }),
    customerConversations: () => rest.get<ConversationListData>(`customerconversations`)
  }
}

export const useMessageCenterResource = () => inject(MessageCenterResource, messageCenterResource())
