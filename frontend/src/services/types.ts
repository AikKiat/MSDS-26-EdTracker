export const ITEM_TYPES = ["assignment", "project", "quiz"] as const

export type ItemType = (typeof ITEM_TYPES)[number]

export type ItemStatus = "draft" | "published"

export interface Course {
  id: string
  name: string
  description: string
  createdAt: string
}

export interface CourseInput {
  name: string
  description: string
}

export interface ItemFile {
  id: string
  name: string
  size: number
  url: string
}

// Structured format the assistant produces on confirm. Project checkoffs and
// milestones will extend this later.
export interface Item {
  id: string
  courseId: string
  type: ItemType
  status: ItemStatus
  name: string
  description: string
  score: number | null
  files: ItemFile[]
  createdAt: string
  updatedAt: string
}

// Raw values from the Create form. Drafts only require `type`.
export interface ItemInput {
  type: ItemType
  name: string
  description: string
  score: number | null
  files: File[]
  // Previously uploaded files to keep when re-saving a draft.
  keepFileIds: string[]
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}
