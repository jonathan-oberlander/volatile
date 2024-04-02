import type heartbeat from './heartbeat.json'
import type products from './product.json'

export type Heartbeat = typeof heartbeat
export type Product = (typeof products)['schema']['items']['example']
export type Products = ReadonlyArray<Product>
export type SideFilter = 'both' | 'sell' | 'buy'

export type Match = { match: string }
export type SubscriptionType =
  | 'error'
  | 'heartbeat'
  | 'ticker'
  | 'subscriptions'

export type Ticker = {
  type: SubscriptionType
  sequence: number
  product_id: string
  price: string
  open_24h: string
  volume_24h: string
  low_24h: string
  high_24h: string
  volume_30d: string
  best_bid: string
  best_bid_size: string
  best_ask: string
  best_ask_size: string
  side: 'buy' | 'sell'
  time: string
  trade_id: number
  last_size: string
}

export type Tick = {
  type: SubscriptionType
  sequence: number
  product_id: string
  price: number
  open_24h: number
  volume_24h: number
  low_24h: number
  high_24h: number
  volume_30d: number
  best_bid: number
  best_bid_size: number
  best_ask: number
  best_ask_size: number
  side: 'buy' | 'sell'
  time: Date
  trade_id: number
  last_size: number
}

export type SubcriptionError = Ticker & {
  type: 'error'
  message: string
  reason: string
}
