import { useRef, type MutableRefObject } from 'react'

export const useLazyRef = <T,>(fn: () => T) => {
  const ref: MutableRefObject<T | null> = useRef(null)
  if (ref.current === null) {
    ref.current = fn()
  }
  return ref.current
}
