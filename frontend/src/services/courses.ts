import { USE_MOCKS } from "@/config/api"
import { mockBackend } from "@/mocks/backend"
import { request } from "@/services/http"
import type { Course, CourseInput } from "@/services/types"

// GET /courses
export function listCourses(): Promise<Course[]> {
  if (USE_MOCKS) return mockBackend.listCourses()
  return request("/courses")
}

// GET /courses/:courseId
export function getCourse(courseId: string): Promise<Course> {
  if (USE_MOCKS) return mockBackend.getCourse(courseId)
  return request(`/courses/${courseId}`)
}

// POST /courses
export function createCourse(input: CourseInput): Promise<Course> {
  if (USE_MOCKS) return mockBackend.createCourse(input)
  return request("/courses", { method: "POST", body: JSON.stringify(input) })
}
