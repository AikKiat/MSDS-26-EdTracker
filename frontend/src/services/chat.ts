import { USE_MOCKS } from "@/config/api"
import { mockBackend } from "@/mocks/backend"
import { request } from "@/services/http"
import type { ChatMessage } from "@/services/types"

// POST /courses/:courseId/chat — sends the conversation, returns the assistant's reply.
export function sendChatMessage(courseId: string, messages: ChatMessage[]): Promise<ChatMessage> {
  if (USE_MOCKS) return mockBackend.sendChatMessage(courseId, messages)
  return request(`/courses/${courseId}/chat`, {
    method: "POST",
    body: JSON.stringify({ messages }),
  })
}
