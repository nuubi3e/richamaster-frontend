export const coinStatus = ['up', 'down', 'neutral'] as const
export type CoinStatus = (typeof coinStatus)[number]
export type CoinList = {
  id: string
  name: string
  price: number
  status: (typeof coinStatus)[number]
}
export type Modes = 'add' | 'default' | 'list'
export interface CoinDetails {
  author: number
  description: symbol
  pk: number
  short_title: string
  social_pages: string[]
  status: string
  technical_details: string
  telegram: string
  title: string
  total_votes: string
  user_votes: number
  website: string
}
