interface SearchBetPayload {
  title?: string
  categories?: number[]
  sort_by:  "finish"
  sort_order: "asc" | "desc"
}

interface CreateBetPayload {
  title: string
  description: string
  categories: number[]
  source1: string
  answers: string[]
  finish: Date | string
}

interface ToggleToFavoritePayload {
  bet_id: number
}

interface CreateBitPayload {
  sum: number
}
