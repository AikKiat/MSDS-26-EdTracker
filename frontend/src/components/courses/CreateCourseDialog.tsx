import { useState, type FormEvent } from "react"
import { PlusIcon } from "lucide-react"
import { useNavigate } from "react-router"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createCourse } from "@/services/courses"
import { routes } from "@/utils/routes"

export function CreateCourseDialog() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [nameError, setNameError] = useState<string>()
  const [submitting, setSubmitting] = useState(false)

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      setName("")
      setDescription("")
      setNameError(undefined)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) {
      setNameError("Give the course a name.")
      return
    }

    setSubmitting(true)
    try {
      const course = await createCourse({ name, description })
      navigate(routes.course(course.id))
    } catch (error) {
      toast.error("Couldn't create course", { description: (error as Error).message })
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            size="icon-lg"
            className="fixed right-6 bottom-6 size-14 rounded-full shadow-lg [&_svg:not([class*='size-'])]:size-6"
            aria-label="Add course"
          />
        }
      >
        <PlusIcon />
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>New course</DialogTitle>
            <DialogDescription>You can add quizzes, assignments and projects next.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field data-invalid={!!nameError}>
              <FieldLabel htmlFor="course-name">Name</FieldLabel>
              <Input
                id="course-name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setNameError(undefined)
                }}
                placeholder="e.g. CS101 Intro to Programming"
                aria-invalid={!!nameError}
                autoFocus
              />
              <FieldError>{nameError}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="course-description">Description</FieldLabel>
              <Textarea
                id="course-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="What is this course about?"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" />}>Cancel</DialogClose>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Creating…" : "Create course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
