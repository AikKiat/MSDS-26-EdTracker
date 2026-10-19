import { createBrowserRouter } from "react-router"

import { CourseHomePage } from "@/pages/course/CourseHomePage"
import { CourseLayout } from "@/pages/course/CourseLayout"
import { CreateItemPage } from "@/pages/course/CreateItemPage"
import { ItemDetailPage } from "@/pages/course/ItemDetailPage"
import { ItemListPage } from "@/pages/course/ItemListPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

export const router = createBrowserRouter([
  { path: "/", element: <DashboardPage /> },
  {
    path: "/courses/:courseId",
    element: <CourseLayout />,
    children: [
      { index: true, element: <CourseHomePage /> },
      { path: "create", element: <CreateItemPage /> },
      { path: "create/:draftId", element: <CreateItemPage /> },
      { path: ":category", element: <ItemListPage /> },
      { path: ":category/:itemId", element: <ItemDetailPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
])
