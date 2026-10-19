import { FolderIcon } from "lucide-react"
import { Link } from "react-router"

import type { Course } from "@/services/types"
import { routes } from "@/utils/routes"

export function CourseFolder({ course }: { course: Course }) {
  return (
    <Link
      to={routes.course(course.id)}
      className="group flex flex-col items-center gap-2 rounded-xl p-4 text-center outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <FolderIcon
        className="size-20 fill-muted text-muted-foreground transition-colors group-hover:fill-background group-hover:text-foreground"
        strokeWidth={1.25}
      />
      <span className="line-clamp-2 text-sm font-medium">{course.name}</span>
      {course.description && (
        <span className="line-clamp-2 text-xs text-muted-foreground">{course.description}</span>
      )}
    </Link>
  )
}
