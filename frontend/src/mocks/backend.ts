import { formatItemInput, replyTo } from "@/mocks/assistant"
import { db } from "@/mocks/db"
import { ApiError } from "@/services/http"
import type {
  ChatMessage,
  Course,
  CourseInput,
  Item,
  ItemFile,
  ItemInput,
  ItemStatus,
  ItemType,
} from "@/services/types"

const LATENCY_MS = 300

// Mirrors the services API so pages exercise loading states and never share
// references with the "database".
function respond<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), LATENCY_MS))
}

function fail(status: number, message: string): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new ApiError(status, message)), LATENCY_MS)
  )
}

function findCourse(courseId: string) {
  return db.courses.find((course) => course.id === courseId)
}

function toItemFile(file: File): ItemFile {
  return {
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    // Stands in for the presigned download URL the backend will return.
    url: URL.createObjectURL(file),
  }
}

export const mockBackend = {
  listCourses(): Promise<Course[]> {
    return respond(db.courses)
  },

  getCourse(courseId: string): Promise<Course> {
    const course = findCourse(courseId)
    return course ? respond(course) : fail(404, "Course not found")
  },

  createCourse(input: CourseInput): Promise<Course> {
    if (!input.name.trim()) return fail(400, "Course name is required")

    const course: Course = {
      id: crypto.randomUUID(),
      name: input.name.trim(),
      description: input.description.trim(),
      createdAt: new Date().toISOString(),
    }
    db.courses.push(course)
    return respond(course)
  },

  listItems(courseId: string, type?: ItemType): Promise<Item[]> {
    if (!findCourse(courseId)) return fail(404, "Course not found")

    const items = db.items.filter(
      (item) => item.courseId === courseId && (!type || item.type === type)
    )
    return respond(items)
  },

  getItem(courseId: string, itemId: string): Promise<Item> {
    const item = db.items.find((item) => item.courseId === courseId && item.id === itemId)
    return item ? respond(item) : fail(404, "Item not found")
  },

  saveItem(courseId: string, input: ItemInput, status: ItemStatus, itemId?: string): Promise<Item> {
    if (!findCourse(courseId)) return fail(404, "Course not found")
    if (!input.type) return fail(400, "Item type is required")

    const existing = itemId
      ? db.items.find((item) => item.courseId === courseId && item.id === itemId)
      : undefined
    if (itemId && !existing) return fail(404, "Item not found")

    const keptFiles = existing?.files.filter((file) => input.keepFileIds.includes(file.id)) ?? []
    existing?.files
      .filter((file) => !input.keepFileIds.includes(file.id))
      .forEach((file) => URL.revokeObjectURL(file.url))

    const fields =
      status === "published"
        ? formatItemInput(input)
        : { name: input.name, description: input.description, score: input.score }
    const now = new Date().toISOString()

    const item: Item = {
      id: existing?.id ?? crypto.randomUUID(),
      courseId,
      type: input.type,
      status,
      ...fields,
      files: [...keptFiles, ...input.files.map(toItemFile)],
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }

    if (existing) {
      db.items[db.items.indexOf(existing)] = item
    } else {
      db.items.push(item)
    }
    return respond(item)
  },

  sendChatMessage(courseId: string, messages: ChatMessage[]): Promise<ChatMessage> {
    const course = findCourse(courseId)
    if (!course) return fail(404, "Course not found")

    return respond({
      id: crypto.randomUUID(),
      role: "assistant",
      content: replyTo(messages, course),
    })
  },
}
