import type { CSSProperties } from "react"
import { Link, Outlet, useParams } from "react-router"

import { PageError, PageLoading } from "@/components/PageState"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { ChatbotPanel } from "@/components/workspace/ChatbotPanel"
import { CourseNavbar } from "@/components/workspace/CourseNavbar"
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader"
import { CourseContext } from "@/context/CourseContext"
import { useCourse } from "@/hooks/useCourses"
import { routes } from "@/utils/routes"

// | Navbar (collapsible left) | Content view | Chatbot (collapsible right) |
// Each sidebar needs its own provider so they collapse independently.
function CourseWorkspace() {
  const navbar = useSidebar()

  return (
    <>
      <CourseNavbar />
      <SidebarInset className="min-w-0">
        <SidebarProvider
          keyboardShortcut={false}
          className="min-h-0 flex-1"
          style={{ "--sidebar-width": "22rem" } as CSSProperties}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <WorkspaceHeader onToggleNavbar={navbar.toggleSidebar} />
            <div className="flex-1 p-6">
              <div className="mx-auto w-full max-w-3xl">
                <Outlet />
              </div>
            </div>
          </div>
          <ChatbotPanel />
        </SidebarProvider>
      </SidebarInset>
    </>
  )
}

export function CourseLayout() {
  const { courseId = "" } = useParams()
  const { data: course, error, loading } = useCourse(courseId)

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageLoading />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex min-h-svh p-6">
        <PageError
          title="Couldn't open this course"
          error={error}
          action={
            <Button nativeButton={false} render={<Link to={routes.dashboard()} />}>
              Back to courses
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <CourseContext value={course}>
      <SidebarProvider>
        <CourseWorkspace key={course.id} />
      </SidebarProvider>
    </CourseContext>
  )
}
