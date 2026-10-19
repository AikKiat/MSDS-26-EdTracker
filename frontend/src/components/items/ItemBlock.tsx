import { Link } from "react-router"

import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Item } from "@/services/types"
import { cn } from "@/lib/utils"
import { ITEM_TYPE_META } from "@/utils/itemTypes"
import { routes } from "@/utils/routes"

// Compact block for category lists: name + brief description. Drafts are
// greyed out and reopen in the Create view.
export function ItemBlock({ item }: { item: Item }) {
  const isDraft = item.status === "draft"

  return (
    <Link
      to={routes.item(item)}
      className="rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Card
        className={cn(
          "transition-colors hover:bg-muted/50",
          isDraft && "border border-dashed bg-muted/40 opacity-70 ring-0"
        )}
      >
        <CardHeader>
          <CardTitle>{item.name || `Untitled ${ITEM_TYPE_META[item.type].label.toLowerCase()}`}</CardTitle>
          <CardDescription className="line-clamp-2">
            {item.description || "No description yet."}
          </CardDescription>
          {isDraft && (
            <CardAction>
              <Badge variant="outline">Draft</Badge>
            </CardAction>
          )}
        </CardHeader>
      </Card>
    </Link>
  )
}
