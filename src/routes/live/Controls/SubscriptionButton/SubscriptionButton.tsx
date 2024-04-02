import { Play, Square } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button } from '~/components/ui/button'
import { useDataStreamStore } from '~/stores/dataStream'
import type { Match } from '~/types/types'
import { useSubscription } from './useSubscription'

export function SubscriptionButton() {
  const [searchParams] = useSearchParams()

  const match = useMemo(
    () => Object.fromEntries(searchParams) as Match,
    [searchParams],
  )

  const { subscribe, unsubscribe } = useSubscription({
    match,
    instant: true,
  })

  const streaming = useDataStreamStore(s => s.streaming)

  return (
    <Button
      size="sm"
      variant={streaming ? 'outline' : 'solid'}
      onClick={streaming ? unsubscribe : subscribe}
    >
      {streaming ? <Square /> : <Play />}
    </Button>
  )
}
