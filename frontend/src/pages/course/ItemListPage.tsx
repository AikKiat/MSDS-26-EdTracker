import { PlusIcon } from "lucide-react"
import { Link, useParams } from "react-router"

import { ItemBlock } from "@/components/items/ItemBlock"
import { PageError, PageLoading } from "@/components/PageState"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useCurrentCourse } from "@/context/CourseContext"
import { useItems } from "@/hooks/useItems"
import type { ItemType } from "@/services/types"
import { ITEM_TYPE_META, itemTypeFromSlug } from "@/utils/itemTypes"
import { routes } from "@/utils/routes"

function ItemList({ type }: { type: ItemType }) {
  const course = useCurrentCourse()
  const { data: items, error, loading } = useItems(course.id, type)
  const { plural, icon: Icon } = ITEM_TYPE_META[type]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">{plural}</h1>
        <Button nativeButton={false} render={<Link to={routes.create(course.id)} />}>
          <PlusIcon data-icon="inline-start" />
          Create
        </Button>
      </div>

      {loading ? (
        <PageLoading />
      ) : !items ? (
        <PageError title={`Couldn't load ${plural.toLowerCase()}`} error={error} />
      ) : items.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Icon />
            </EmptyMedia>
            <EmptyTitle>No {plural.toLowerCase()} yet</EmptyTitle>
            <EmptyDescription>Ones you create or save as drafts show up here.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <ItemBlock key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ItemListPage() {
  const { category } = useParams()
  const type = itemTypeFromSlug(category)

  if (!type) return <PageError title="Page not found" />
  return <ItemList type={type} />
}
