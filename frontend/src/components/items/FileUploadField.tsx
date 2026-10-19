import { PaperclipIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { ItemFile } from "@/services/types"
import { formatFileSize } from "@/utils/formatFileSize"

interface FileUploadFieldProps {
  // Files already uploaded with a saved draft.
  existingFiles: ItemFile[]
  newFiles: File[]
  onRemoveExisting: (fileId: string) => void
  onAdd: (files: File[]) => void
  onRemoveNew: (index: number) => void
}

export function FileUploadField({
  existingFiles,
  newFiles,
  onRemoveExisting,
  onAdd,
  onRemoveNew,
}: FileUploadFieldProps) {
  const rows = [
    ...existingFiles.map((file) => ({
      key: file.id,
      name: file.name,
      size: file.size,
      remove: () => onRemoveExisting(file.id),
    })),
    ...newFiles.map((file, index) => ({
      key: `new-${index}-${file.name}`,
      name: file.name,
      size: file.size,
      remove: () => onRemoveNew(index),
    })),
  ]

  return (
    <Field>
      <FieldLabel htmlFor="item-files">Supporting documents</FieldLabel>
      <Input
        id="item-files"
        type="file"
        multiple
        onChange={(event) => {
          onAdd(Array.from(event.target.files ?? []))
          // Reset so picking the same file again still fires onChange.
          event.target.value = ""
        }}
      />
      <FieldDescription>Rubrics, starter code, reading material — anything students need.</FieldDescription>
      {rows.length > 0 && (
        <ul className="flex flex-col gap-1">
          {rows.map((row) => (
            <li
              key={row.key}
              className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm"
            >
              <PaperclipIcon className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{row.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatFileSize(row.size)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="ml-auto"
                onClick={row.remove}
                aria-label={`Remove ${row.name}`}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Field>
  )
}
