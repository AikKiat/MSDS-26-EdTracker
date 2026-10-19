export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ""

// Mocks stay on until the backend implements the course/item endpoints.
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false"
