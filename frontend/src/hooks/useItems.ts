import { useCallback } from "react"

import { useResource } from "@/hooks/useResource"
import { getItem, listItems } from "@/services/items"
import type { ItemType } from "@/services/types"

export function useItems(courseId: string, type?: ItemType) {
  return useResource(useCallback(() => listItems(courseId, type), [courseId, type]))
}

export function useItem(courseId: string, itemId: string) {
  return useResource(useCallback(() => getItem(courseId, itemId), [courseId, itemId]))
}
