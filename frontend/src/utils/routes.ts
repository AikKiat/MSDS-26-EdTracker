import type { Item, ItemType } from "@/services/types"
import { ITEM_TYPE_META } from "@/utils/itemTypes"

export const routes = {
  dashboard: () => "/",
  course: (courseId: string) => `/courses/${courseId}`,
  create: (courseId: string) => `/courses/${courseId}/create`,
  category: (courseId: string, type: ItemType) =>
    `/courses/${courseId}/${ITEM_TYPE_META[type].slug}`,
  // Drafts reopen in the Create view; published items open their detail view.
  item: (item: Item) =>
    item.status === "draft"
      ? `/courses/${item.courseId}/create/${item.id}`
      : `/courses/${item.courseId}/${ITEM_TYPE_META[item.type].slug}/${item.id}`,
}
