import { ClipboardListIcon, FileTextIcon, FolderKanbanIcon, type LucideIcon } from "lucide-react"

import { ITEM_TYPES, type ItemType } from "@/services/types"

interface ItemTypeMeta {
  label: string
  plural: string
  // URL segment of the category view, e.g. /courses/:courseId/assignments
  slug: string
  icon: LucideIcon
}

export const ITEM_TYPE_META: Record<ItemType, ItemTypeMeta> = {
  project: { label: "Project", plural: "Projects", slug: "projects", icon: FolderKanbanIcon },
  assignment: { label: "Assignment", plural: "Assignments", slug: "assignments", icon: FileTextIcon },
  quiz: { label: "Quiz", plural: "Quizzes", slug: "quizzes", icon: ClipboardListIcon },
}

// Navbar order from the spec: Projects, Assignments, Quizzes.
export const NAV_ITEM_TYPES: ItemType[] = ["project", "assignment", "quiz"]

export function itemTypeFromSlug(slug: string | undefined): ItemType | undefined {
  return ITEM_TYPES.find((type) => ITEM_TYPE_META[type].slug === slug)
}
