import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useDataStreamStore } from '~/stores/dataStream'
import type {
  Heartbeat,
  Match,
  SubcriptionError,
  Tick,
  Ticker,
} from '~/types/types'

export function useSubscription({
  instant = true,
  match,
}: { instant?: boolean; match: Match }) {
  const methods = useDataStreamStore(
    useShallow(s => ({
      setTicker: s.setData,
      setHeartBeat: s.setHeartBeat,
      setStreaming: s.setStreaming,
      setError: s.setError,
    })),
  )

  const ws = useRef<WebSocket | null>(null)

  const subscribe = useCallback((match: Match) => {
    ws.current = new WebSocket(import.meta.env.VITE_COINBASE_WS)

    ws.current.onopen = () => {
      const payload = JSON.stringify({
        type: 'subscribe',
        channels: [
          {
            name: 'ticker',
            product_ids: [match.match],
          },
          {
            name: 'heartbeat',
            product_ids: [match.match],
          },
        ],
      })

      ws.current?.send(payload)
    }

    return ws.current
  }, [])

  const start = useCallback(() => {
    const ws = subscribe(match)
    methods.setStreaming(true)

    ws.onmessage = (event: MessageEvent<string>) => {
      const data = JSON.parse(event.data) as Heartbeat | Ticker

      if (isError(data)) {
        methods.setError(data.reason)
      } else if (isSubscriptions(data)) {
        // unhandled for now
        console.log(data)
      } else if (isHeartbeat(data)) {
        methods.setHeartBeat(data)
      } else {
        methods.setTicker(parseTicker(data))
      }
    }
  }, [match, subscribe, methods])

  const unsubscribe = useCallback(() => {
    if (ws.current?.readyState !== ws.current?.CONNECTING) {
      ws.current?.close()
      methods.setStreaming(false)
    }
  }, [methods.setStreaming])

  useEffect(() => {
    if (instant) {
      start()
    }

    const onVisibilityChange = () => (document.hidden ? unsubscribe() : start())

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      unsubscribe()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [instant, start, unsubscribe])

  return {
    subscribe: start,
    unsubscribe,
  }
}

const parseTicker = (t: Ticker): Tick => ({
  ...t,
  price: Number(t.price),
  open_24h: Number(t.open_24h),
  volume_24h: Number(t.volume_24h),
  low_24h: Number(t.low_24h),
  high_24h: Number(t.high_24h),
  volume_30d: Number(t.volume_30d),
  best_bid: Number(t.best_bid),
  best_bid_size: Number(t.best_bid_size),
  best_ask: Number(t.best_ask),
  best_ask_size: Number(t.best_ask_size),
  time: new Date(t.time),
  last_size: Number(t.last_size),
})

const isHeartbeat = (data: unknown): data is Heartbeat =>
  typeof data === 'object' &&
  !!data &&
  'type' in data &&
  data.type === 'heartbeat'

const isSubscriptions = (data: unknown): data is Heartbeat =>
  typeof data === 'object' &&
  !!data &&
  'type' in data &&
  data.type === 'subscriptions'

const isError = (data: unknown): data is SubcriptionError =>
  typeof data === 'object' && !!data && 'type' in data && data.type === 'error'
