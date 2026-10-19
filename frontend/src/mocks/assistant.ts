import type { ChatMessage, Course, ItemInput } from "@/services/types"

type FormattedFields = Pick<ItemInput, "name" | "description" | "score">

// Fake version of the AI step that turns raw Create-form input into the
// structured format. The real one will run on the backend.
export function formatItemInput(input: ItemInput): FormattedFields {
  const name = input.name.trim().replace(/\s+/g, " ")
  const description = input.description.trim()

  return {
    name: name ? name.charAt(0).toUpperCase() + name.slice(1) : `Untitled ${input.type}`,
    description,
    score: input.score === null ? null : Math.max(0, input.score),
  }
}

export function replyTo(messages: ChatMessage[], course: Course): string {
  const question = messages.at(-1)?.content ?? ""
  return (
    `I'm a mock assistant for ${course.name}, so I can't answer “${question}” yet. ` +
    "Once the backend is connected I'll help draft and format your quizzes, assignments and projects."
  )
}
