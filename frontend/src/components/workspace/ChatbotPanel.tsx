import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { BotIcon, PanelRightCloseIcon, SendIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Textarea } from "@/components/ui/textarea"
import { useCurrentCourse } from "@/context/CourseContext"
import { sendChatMessage } from "@/services/chat"
import type { ChatMessage, Course } from "@/services/types"
import { cn } from "@/lib/utils"

function greeting(course: Course): ChatMessage {
  return {
    id: "greeting",
    role: "assistant",
    content:
      `Hi! I'm the assistant for ${course.name}. When you confirm a new quiz, ` +
      "assignment or project, I format it into the structured layout for its category.",
  }
}

export function ChatbotPanel() {
  const course = useCurrentCourse()
  const { toggleSidebar } = useSidebar()
  const [messages, setMessages] = useState(() => [greeting(course)])
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" })
  }, [messages, pending])

  async function send(event?: FormEvent) {
    event?.preventDefault()
    const content = input.trim()
    if (!content || pending) return

    const next: ChatMessage[] = [...messages, { id: crypto.randomUUID(), role: "user", content }]
    setMessages(next)
    setInput("")
    setPending(true)
    try {
      const reply = await sendChatMessage(course.id, next)
      setMessages((current) => [...current, reply])
    } catch (error) {
      toast.error("Assistant unavailable", { description: (error as Error).message })
    } finally {
      setPending(false)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      send()
    }
  }

  return (
    <Sidebar side="right" collapsible="icon">
      {/* Icon rail shown while collapsed */}
      <SidebarHeader className="hidden group-data-[collapsible=icon]:flex">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleSidebar}
              tooltip={{ children: "Open assistant", side: "left" }}
            >
              <BotIcon />
              <span>Assistant</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarHeader className="h-12 flex-row items-center border-b px-3 group-data-[collapsible=icon]:hidden">
        <BotIcon className="size-4" />
        <span className="text-sm font-medium">Assistant</span>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ml-auto"
          onClick={toggleSidebar}
          aria-label="Collapse assistant"
        >
          <PanelRightCloseIcon />
        </Button>
      </SidebarHeader>

      <SidebarContent className="gap-3 p-3 group-data-[collapsible=icon]:hidden" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
              message.role === "user"
                ? "self-end bg-primary text-primary-foreground"
                : "self-start bg-muted"
            )}
          >
            {message.content}
          </div>
        ))}
        {pending && (
          <div className="self-start rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            Thinking…
          </div>
        )}
        <div ref={endRef} />
      </SidebarContent>

      <SidebarFooter className="border-t group-data-[collapsible=icon]:hidden">
        <form onSubmit={send} className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask the assistant…"
            aria-label="Message the assistant"
            className="max-h-40 min-h-9 bg-background"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || pending} aria-label="Send">
            <SendIcon />
          </Button>
        </form>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
