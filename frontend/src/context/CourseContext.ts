import { createContext, useContext } from "react"

import type { Course } from "@/services/types"

// The course whose workspace is open, provided by CourseLayout.
export const CourseContext = createContext<Course | null>(null)

export function useCurrentCourse(): Course {
  const course = useContext(CourseContext)
  if (!course) {
    throw new Error("useCurrentCourse must be used within a course workspace.")
  }
  return course
}
