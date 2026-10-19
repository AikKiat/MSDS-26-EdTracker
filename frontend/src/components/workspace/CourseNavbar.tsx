import { ArrowLeftIcon, FolderOpenIcon, PlusIcon } from "lucide-react"
import { Link, useLocation } from "react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { useCurrentCourse } from "@/context/CourseContext"
import { ITEM_TYPE_META, NAV_ITEM_TYPES } from "@/utils/itemTypes"
import { routes } from "@/utils/routes"

function isWithin(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`)
}

export function CourseNavbar() {
  const course = useCurrentCourse()
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  // On mobile the navbar is a sheet that should close after navigating.
  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false)
  }
  const createPath = routes.create(course.id)

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={course.name}
              render={<Link to={routes.course(course.id)} onClick={closeOnMobile} />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <FolderOpenIcon />
              </div>
              <div className="grid flex-1 leading-tight">
                <span className="truncate font-medium">{course.name}</span>
                <span className="truncate text-xs text-muted-foreground">Course</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Course content</SidebarGroupLabel>
          <SidebarMenu>
            {NAV_ITEM_TYPES.map((type) => {
              const { plural, icon: Icon } = ITEM_TYPE_META[type]
              const to = routes.category(course.id, type)
              return (
                <SidebarMenuItem key={type}>
                  <SidebarMenuButton
                    isActive={isWithin(pathname, to)}
                    tooltip={plural}
                    render={<Link to={to} onClick={closeOnMobile} />}
                  >
                    <Icon />
                    <span>{plural}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isWithin(pathname, createPath)}
                tooltip="Create"
                render={<Link to={createPath} onClick={closeOnMobile} />}
              >
                <PlusIcon />
                <span>Create</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="All courses" render={<Link to={routes.dashboard()} />}>
              <ArrowLeftIcon />
              <span>All courses</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
