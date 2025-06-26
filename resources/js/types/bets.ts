export interface SearchBetsPayload {
  title?: string
  categories?: number[]

  page: number
  per_page: number
  sort_order: "asc" | "desc"
  sort_by:  "finish" | "title" | "budget"       // finish - default
}

export interface CreateBetPayload {
  title: string
  description: string
  categories: number[]
  source1: string
  source2?: string
  source3?: string
  answers: string[]
  finish: Date | string
}

export interface ToggleToFavoritePayload {
  id: number
}

export interface CreateBitPayload {
  sum: number
  id: number
}

export interface BetItem {
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

export interface UseBetsOptions {
  isHot?: boolean
}

export interface BetCaruselPayload {
  currency_id?: number  // fix after API fix
  current_id: number
  direction: "next" | "previous"
}

export enum BET_STATUS_ENUM {
  CREATED = 1,
  PAID = 2,
  APPROVED = 3,
  CANCELED = 4,
  FINISHED = 5
}
