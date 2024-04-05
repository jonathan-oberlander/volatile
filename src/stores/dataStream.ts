import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Heartbeat, SideFilter, Tick } from '~/types/types'

// const ReadyStateMap = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'] as const

// type ReadyState = (typeof ReadyStateMap)[number]

type DataStream = {
  // --- state ---
  data: Tick[]
  dataSize: number
  sideFilter: SideFilter
  streaming: boolean
  heartBeat: Heartbeat | null
  error: string | null
  // readyState: ReadyState | undefined

  // --- functions ---
  setData: (data: Tick) => void
  resetData: () => void
  setError: (error: string | null) => void
  setDataSize: (dataSize: number) => void
  setSideFilter: (sideFilter: SideFilter) => void
  setStreaming: (streaming: boolean) => void
  setHeartBeat: (heartBeat: Heartbeat) => void
  // setReadyState: (readyState: number | undefined) => void
}

export const useDataStreamStore = create<DataStream>()(
  devtools((set, get) => ({
    // --- state ---
    data: [],
    dataSize: 100,
    sideFilter: 'both',
    streaming: false,
    heartBeat: null,
    error: null,
    // readyState: undefined,

    // --- functions ---
    setData: data =>
      set(state => ({
        ...state,
        data: [data, ...state.data].filter(Boolean).slice(0, get().dataSize),
      })),
    resetData: () => set(state => ({ ...state, data: [] })),
    setError: error => set(state => ({ ...state, error })),
    setDataSize: dataSize => set(state => ({ ...state, dataSize })),
    setSideFilter: sideFilter => set(state => ({ ...state, sideFilter })),
    setStreaming: streaming => set(state => ({ ...state, streaming })),
    setHeartBeat: heartBeat => set(state => ({ ...state, heartBeat })),
    // setReadyState: (readyState: number | undefined) =>
    //   set(state => ({
    //     ...state,
    //     readyState: ReadyStateMap[readyState ?? 0],
    //   })),
  })),
)

// selectors

export const useDataStream = () =>
  useDataStreamStore(s =>
    s.data.filter(
      tick => s.sideFilter === 'both' || tick.side === s.sideFilter,
    ),
  )
