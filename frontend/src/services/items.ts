import { USE_MOCKS } from "@/config/api"
import { mockBackend } from "@/mocks/backend"
import { request } from "@/services/http"
import type { Item, ItemInput, ItemStatus, ItemType } from "@/services/types"

// GET /courses/:courseId/items?type=
export function listItems(courseId: string, type?: ItemType): Promise<Item[]> {
  if (USE_MOCKS) return mockBackend.listItems(courseId, type)
  const query = type ? `?type=${type}` : ""
  return request(`/courses/${courseId}/items${query}`)
}

// GET /courses/:courseId/items/:itemId
export function getItem(courseId: string, itemId: string): Promise<Item> {
  if (USE_MOCKS) return mockBackend.getItem(courseId, itemId)
  return request(`/courses/${courseId}/items/${itemId}`)
}

// Stores the raw form input as-is. Pass `itemId` to update an existing draft.
export function saveDraft(courseId: string, input: ItemInput, itemId?: string): Promise<Item> {
  return saveItem(courseId, input, "draft", itemId)
}

// Publishes the item. The backend has the assistant format the raw input into
// the structured format for its type before storing it.
export function confirmItem(courseId: string, input: ItemInput, itemId?: string): Promise<Item> {
  return saveItem(courseId, input, "published", itemId)
}

// POST /courses/:courseId/items, or PATCH /courses/:courseId/items/:itemId
// (multipart, so supporting documents upload with the fields)
function saveItem(
  courseId: string,
  input: ItemInput,
  status: ItemStatus,
  itemId?: string
): Promise<Item> {
  if (USE_MOCKS) return mockBackend.saveItem(courseId, input, status, itemId)

  const body = new FormData()
  body.set("status", status)
  body.set("type", input.type)
  body.set("name", input.name)
  body.set("description", input.description)
  if (input.score !== null) body.set("score", String(input.score))
  input.keepFileIds.forEach((id) => body.append("keepFileIds", id))
  input.files.forEach((file) => body.append("files", file))

  return itemId
    ? request(`/courses/${courseId}/items/${itemId}`, { method: "PATCH", body })
    : request(`/courses/${courseId}/items`, { method: "POST", body })
}
