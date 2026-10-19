import type { ReactNode } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { Link, Navigate, useParams } from "react-router"

import { FileDownloadList } from "@/components/items/FileDownloadList"
import { PageError, PageLoading } from "@/components/PageState"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrentCourse } from "@/context/CourseContext"
import { useItem } from "@/hooks/useItems"
import { ITEM_TYPE_META, itemTypeFromSlug } from "@/utils/itemTypes"
import { routes } from "@/utils/routes"

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{title}</h2>
      {children}
    </section>
  )
}

// Full structured format of a published item. Projects will add checkoffs here.
export function ItemDetailPage() {
  const course = useCurrentCourse()
  const { category, itemId = "" } = useParams()
  const { data: item, error, loading } = useItem(course.id, itemId)

  if (loading) return <PageLoading />
  if (!item || item.type !== itemTypeFromSlug(category)) {
    return <PageError title="Item not found" error={error} />
  }
  if (item.status === "draft") return <Navigate to={routes.item(item)} replace />

  const { label, plural } = ITEM_TYPE_META[item.type]

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        size="sm"
        className="self-start"
        nativeButton={false}
        render={<Link to={routes.category(course.id, item.type)} />}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        {plural}
      </Button>
      <Card>
        <CardHeader>
          <CardDescription>{label}</CardDescription>
          <CardTitle className="text-xl">{item.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <DetailSection title="Score">
            <p className="text-sm">{item.score ?? "—"} points</p>
          </DetailSection>
          <DetailSection title="Files">
            <FileDownloadList files={item.files} />
          </DetailSection>
          <DetailSection title="Description">
            <p className="text-sm whitespace-pre-wrap">{item.description}</p>
          </DetailSection>
        </CardContent>
      </Card>
    </div>
  )
}
