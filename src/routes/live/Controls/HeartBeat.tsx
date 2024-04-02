import { styled } from '@styled-system/jsx'
import { useEffect, useState } from 'react'

import { useDataStreamStore } from '~/stores/dataStream'

const Pulse = styled('div', {
  base: {
    width: '6',
    height: '6',
    border: '_debug',
    rounded: 'xl',
    transition: 'all',
    boxShadow: 'sm',
    transform: 'scale(1)',
    bg: 'bg.canvas',
    transitionDuration: 'fast',
    transitionTimingFunction: 'pulse',
    borderColor: 'accent.4',
    borderWidth: 'thick',
  },

  variants: {
    pulse: {
      false: {
        boxShadow: 'xl',
        transform: 'scale(0)',
        // borderWidth: 'thin',
      },
      true: {
        boxShadow: 'sm',
        transform: 'scale(1)',
      },
    },
  },

  defaultVariants: {
    pulse: true,
  },
})

export function HeartBeat() {
  const [state, setState] = useState(false)
  const hb = useDataStreamStore(s => s.heartBeat)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setState(s => !s)
  }, [hb])

  return <Pulse pulse={state} />
}
