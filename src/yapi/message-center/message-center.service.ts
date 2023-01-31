import type {
  ConversationData,
  ConversationListData,
  ConversationMessageData,
  ConversationMessageListData,
  ConversationRequestData
} from '@/yapi/models'
import { RestClient } from '@/yapi/rest'

export class MessageCenterService extends RestClient {
  getEndpoint() {
    return `${this.basePath}/messagecenter/im/conversations/`
  }

  /**
   * Sends messages in a conversation and returns the conversation data.
   * @param {string} conversationId
   * @param {ConversationMessageData[]} messages
   */
  send(conversationId: string, messages: ConversationMessageData[]) {
    return this.post<ConversationData>({ conversationId, messages })
  }

  /**
   * Closes an open conversation and returns the conversation data.
   * @param {string} conversationId
   */
  close(conversationId: string) {
    return this.patch<ConversationData>(`${conversationId}/close`, {})
  }

  /**
   * Gets all messages of a specific conversation.
   * @param {string} conversationId
   */
  messages(conversationId: string) {
    return this.get<ConversationMessageListData>(`${conversationId}/messages`)
  }

  /**
   * Picks an unassigned conversation and returns the conversation data.
   * @param {string} conversationId
   */
  pick(conversationId: string) {
    return this.patch<ConversationData>(`${conversationId}/pick`, {})
  }

  /**
   * Returns unassigned or open conversation list for current CSA.
   * @param {ConversationRequestData} queryParams
   */
  agentConversations(queryParams?: ConversationRequestData) {
    return this.get<ConversationListData>(`agentconversations`, { params: queryParams })
  }

  /**
   * Returns the conversation list of current customer.
   */
  customerConversations() {
    return this.get<ConversationListData>(`customerconversations`)
  }
}
