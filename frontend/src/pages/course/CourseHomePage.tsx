import { FolderOpenIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"

import { PageError, PageLoading } from "@/components/PageState"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useCurrentCourse } from "@/context/CourseContext"
import { useItems } from "@/hooks/useItems"
import { ITEM_TYPE_META, NAV_ITEM_TYPES } from "@/utils/itemTypes"
import { routes } from "@/utils/routes"

export function CourseHomePage() {
  const course = useCurrentCourse()
  const { data: items, error, loading } = useItems(course.id)

  if (loading) return <PageLoading />
  if (!items) return <PageError title="Couldn't load this course" error={error} />

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{course.name}</h1>
        {course.description && <p className="text-muted-foreground">{course.description}</p>}
      </div>

      {items.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderOpenIcon />
            </EmptyMedia>
            <EmptyTitle>This course is empty</EmptyTitle>
            <EmptyDescription>Create your first quiz, assignment or project.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button nativeButton={false} render={<Link to={routes.create(course.id)} />}>
              <PlusIcon data-icon="inline-start" />
              Create
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="grid gap-3 sm:grid-cols-3">
          {NAV_ITEM_TYPES.map((type) => {
            const { plural, icon: Icon } = ITEM_TYPE_META[type]
            const ofType = items.filter((item) => item.type === type)
            const drafts = ofType.filter((item) => item.status === "draft").length
            return (
              <Link
                key={type}
                to={routes.category(course.id, type)}
                className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <Icon className="mb-2 size-5 text-muted-foreground" />
                    <CardTitle>{plural}</CardTitle>
                    <CardDescription>
                      {ofType.length - drafts} published · {drafts} draft{drafts === 1 ? "" : "s"}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
