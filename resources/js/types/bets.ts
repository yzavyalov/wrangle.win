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

interface BetItem {
  id: number
  user_id: number
  title: string
  image: string
  status: number
  status_type: string
  source1: string
  source2: string
  source3: string
  description: string
  finish: string
  budget: number
  answers: any[]
  winner: any[]
  bits: any[]
}

interface UseBetsOptions {
  isHot?: boolean
}
