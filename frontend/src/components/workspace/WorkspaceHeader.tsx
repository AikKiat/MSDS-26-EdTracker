import { BotIcon, PanelLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { useCurrentCourse } from "@/context/CourseContext"

// Rendered inside the chatbot's SidebarProvider, so the navbar toggle is
// passed in from the outer provider.
export function WorkspaceHeader({ onToggleNavbar }: { onToggleNavbar: () => void }) {
  const course = useCurrentCourse()
  const chat = useSidebar()

  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center gap-2 border-b bg-background px-3">
      <Button variant="ghost" size="icon-sm" onClick={onToggleNavbar} aria-label="Toggle navigation">
        <PanelLeftIcon />
      </Button>
      <Separator orientation="vertical" className="my-3" />
      <span className="truncate text-sm font-medium">{course.name}</span>
      <Button
        variant="ghost"
        size="icon-sm"
        className="ml-auto"
        onClick={chat.toggleSidebar}
        aria-label="Toggle assistant"
      >
        <BotIcon />
      </Button>
    </header>
  )
}
