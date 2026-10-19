import { useCallback } from "react"

import { useResource } from "@/hooks/useResource"
import { getCourse, listCourses } from "@/services/courses"

export function useCourses() {
  return useResource(listCourses)
}

export function useCourse(courseId: string) {
  return useResource(useCallback(() => getCourse(courseId), [courseId]))
}
