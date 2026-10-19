import { useState } from "react"

import { FileUploadField } from "@/components/items/FileUploadField"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ITEM_TYPES, type Item, type ItemInput, type ItemType } from "@/services/types"
import { ITEM_TYPE_META } from "@/utils/itemTypes"

type FieldName = "type" | "name" | "description" | "score"
type Errors = Partial<Record<FieldName, string>>
export type SubmitAction = "draft" | "confirm"

interface ItemFormProps {
  // Draft being resumed, if any.
  draft?: Item
  submitting?: SubmitAction
  onSubmit: (action: SubmitAction, input: ItemInput) => void
}

const typeItems = ITEM_TYPES.map((type) => ({ value: type, label: ITEM_TYPE_META[type].label }))

export function ItemForm({ draft, submitting, onSubmit }: ItemFormProps) {
  const [type, setType] = useState<ItemType | null>(draft?.type ?? null)
  const [name, setName] = useState(draft?.name ?? "")
  const [description, setDescription] = useState(draft?.description ?? "")
  const [score, setScore] = useState(draft?.score?.toString() ?? "")
  const [existingFiles, setExistingFiles] = useState(draft?.files ?? [])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Errors>({})

  function clearError(field: FieldName) {
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function validate(action: SubmitAction): Errors {
    const next: Errors = {}
    // Drafts are filed under their category, so the type is the only hard requirement.
    if (!type) next.type = "Select a type to save this item."
    if (action === "confirm") {
      if (!name.trim()) next.name = "Add a name."
      if (!description.trim()) next.description = "Add a description."
      if (score === "") next.score = "Add a score."
    }
    if (score !== "" && Number(score) < 0) next.score = "Score can't be negative."
    return next
  }

  function submit(action: SubmitAction) {
    const next = validate(action)
    setErrors(next)
    if (Object.keys(next).length > 0 || !type) return

    onSubmit(action, {
      type,
      name,
      description,
      score: score === "" ? null : Number(score),
      files: newFiles,
      keepFileIds: existingFiles.map((file) => file.id),
    })
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        submit("confirm")
      }}
      noValidate
    >
      <FieldGroup>
        <Field data-invalid={!!errors.type}>
          <FieldLabel htmlFor="item-type">Type</FieldLabel>
          <Select
            items={typeItems}
            value={type}
            onValueChange={(value) => {
              setType(value)
              clearError("type")
            }}
          >
            <SelectTrigger id="item-type" className="w-full" aria-invalid={!!errors.type}>
              <SelectValue placeholder="Select quiz, assignment or project" />
            </SelectTrigger>
            <SelectContent>
              {typeItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError>{errors.type}</FieldError>
        </Field>

        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="item-name">Name</FieldLabel>
          <Input
            id="item-name"
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              clearError("name")
            }}
            placeholder="e.g. Linked Lists"
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name}</FieldError>
        </Field>

        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="item-description">Description</FieldLabel>
          <Textarea
            id="item-description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
              clearError("description")
            }}
            placeholder="Describe the task. Rough notes are fine — the assistant tidies them up on confirm."
            className="min-h-32"
            aria-invalid={!!errors.description}
          />
          <FieldError>{errors.description}</FieldError>
        </Field>

        <Field data-invalid={!!errors.score} className="max-w-48">
          <FieldLabel htmlFor="item-score">Score</FieldLabel>
          <Input
            id="item-score"
            type="number"
            inputMode="numeric"
            min={0}
            value={score}
            onChange={(event) => {
              setScore(event.target.value)
              clearError("score")
            }}
            placeholder="100"
            aria-invalid={!!errors.score}
          />
          <FieldError>{errors.score}</FieldError>
        </Field>

        <FileUploadField
          existingFiles={existingFiles}
          newFiles={newFiles}
          onRemoveExisting={(id) => setExistingFiles((files) => files.filter((f) => f.id !== id))}
          onAdd={(files) => setNewFiles((current) => [...current, ...files])}
          onRemoveNew={(index) => setNewFiles((current) => current.filter((_, i) => i !== index))}
        />

        <Field orientation="horizontal" className="justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={!!submitting}
            onClick={() => submit("draft")}
          >
            {submitting === "draft" ? "Saving…" : "Save draft"}
          </Button>
          <Button type="submit" disabled={!!submitting}>
            {submitting === "confirm" ? "Formatting…" : "Confirm"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
