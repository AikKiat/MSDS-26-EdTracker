import type { Course, Item } from "@/services/types"

// In-memory stand-in for the backend database. Resets on page reload.
export const db: { courses: Course[]; items: Item[] } = {
  courses: [
    {
      id: "cs101",
      name: "CS101 Intro to Programming",
      description: "Fundamentals of programming in Python.",
      createdAt: "2026-09-01T09:00:00.000Z",
    },
    {
      id: "ma204",
      name: "MA204 Linear Algebra",
      description: "Vectors, matrices and linear transformations.",
      createdAt: "2026-09-02T09:00:00.000Z",
    },
  ],
  items: [
    {
      id: "cs101-a1",
      courseId: "cs101",
      type: "assignment",
      status: "published",
      name: "Linked Lists",
      description:
        "Implement a singly linked list with insert, delete and search operations. Include unit tests for each operation and explain the time complexity of each method in your README.",
      score: 100,
      files: [],
      createdAt: "2026-09-05T09:00:00.000Z",
      updatedAt: "2026-09-05T09:00:00.000Z",
    },
    {
      id: "cs101-a2",
      courseId: "cs101",
      type: "assignment",
      status: "draft",
      name: "Recursion",
      description: "Five classic recursion problems…",
      score: null,
      files: [],
      createdAt: "2026-09-12T09:00:00.000Z",
      updatedAt: "2026-09-12T09:00:00.000Z",
    },
    {
      id: "cs101-p1",
      courseId: "cs101",
      type: "project",
      status: "published",
      name: "Text Adventure Game",
      description:
        "Build a command-line text adventure with at least five rooms, an inventory system and save/load support.",
      score: 200,
      files: [],
      createdAt: "2026-09-06T09:00:00.000Z",
      updatedAt: "2026-09-06T09:00:00.000Z",
    },
    {
      id: "cs101-q1",
      courseId: "cs101",
      type: "quiz",
      status: "published",
      name: "Week 3 Quiz",
      description: "Covers variables, control flow and functions.",
      score: 20,
      files: [],
      createdAt: "2026-09-07T09:00:00.000Z",
      updatedAt: "2026-09-07T09:00:00.000Z",
    },
  ],
}
