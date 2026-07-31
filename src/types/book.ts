import type { Rating } from "./rating"

export interface Book {
  id: number,
  title: string,
  description?: string,
  cover: string,
  author: string,
  year: number,
  discussionDate: string,
  ratings?: Rating[],
  average?: number
}