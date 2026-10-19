import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import { toast } from "sonner"

import { ItemForm, type SubmitAction } from "@/components/items/ItemForm"
import { PageError, PageLoading } from "@/components/PageState"
import { Card, CardContent } from "@/components/ui/card"
import { useCurrentCourse } from "@/context/CourseContext"
import { useItem } from "@/hooks/useItems"
import { confirmItem, saveDraft } from "@/services/items"
import type { Item, ItemInput } from "@/services/types"
import { ITEM_TYPE_META } from "@/utils/itemTypes"
import { routes } from "@/utils/routes"

function CreateItemView({ draft }: { draft?: Item }) {
  const course = useCurrentCourse()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState<SubmitAction>()

  async function handleSubmit(action: SubmitAction, input: ItemInput) {
    setSubmitting(action)
    try {
      if (action === "draft") {
        const item = await saveDraft(course.id, input, draft?.id)
        toast.success("Draft saved", {
          description: `It's under ${ITEM_TYPE_META[item.type].plural}.`,
        })
        navigate(routes.category(course.id, item.type))
      } else {
        const item = await confirmItem(course.id, input, draft?.id)
        toast.success(`${ITEM_TYPE_META[item.type].label} created`)
        navigate(routes.item(item))
      }
    } catch (error) {
      toast.error("Couldn't save", { description: (error as Error).message })
      setSubmitting(undefined)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {draft ? "Continue draft" : "Create"}
        </h1>
        <p className="text-muted-foreground">Add a quiz, assignment or project to {course.name}.</p>
      </div>
      <Card>
        <CardContent>
          <ItemForm draft={draft} submitting={submitting} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

function ResumeDraft({ draftId }: { draftId: string }) {
  const course = useCurrentCourse()
  const { data: item, error, loading } = useItem(course.id, draftId)

  if (loading) return <PageLoading />
  if (!item) return <PageError title="Couldn't open this draft" error={error} />
  if (item.status !== "draft") return <Navigate to={routes.item(item)} replace />
  return <CreateItemView draft={item} />
}

export function CreateItemPage() {
  const { draftId } = useParams()
  return draftId ? <ResumeDraft key={draftId} draftId={draftId} /> : <CreateItemView />
}
