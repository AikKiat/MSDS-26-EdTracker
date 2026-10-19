import { FolderIcon, GraduationCapIcon } from "lucide-react"

import { CourseFolder } from "@/components/courses/CourseFolder"
import { CreateCourseDialog } from "@/components/courses/CreateCourseDialog"
import { PageError } from "@/components/PageState"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { useCourses } from "@/hooks/useCourses"

const GRID = "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"

function CourseGrid() {
  const { data: courses, error, loading } = useCourses()

  if (loading) {
    return (
      <div className={GRID} aria-busy="true" aria-label="Loading courses">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-4">
            <Skeleton className="size-20 rounded-xl" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (!courses) return <PageError title="Couldn't load courses" error={error} />

  if (courses.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderIcon />
          </EmptyMedia>
          <EmptyTitle>No courses yet</EmptyTitle>
          <EmptyDescription>Use the + button to add your first course.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className={GRID}>
      {courses.map((course) => (
        <CourseFolder key={course.id} course={course} />
      ))}
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="min-h-svh">
      <header className="flex h-14 items-center gap-2 border-b px-6">
        <GraduationCapIcon className="size-5" />
        <span className="font-semibold">EdTracker</span>
      </header>
      <main className="mx-auto w-full max-w-6xl p-6 pb-28">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">My courses</h1>
        <CourseGrid />
      </main>
      <CreateCourseDialog />
    </div>
  )
}
