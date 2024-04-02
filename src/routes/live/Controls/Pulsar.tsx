import { styled } from '@styled-system/jsx'

import { useDataStreamStore } from '~/stores/dataStream'

const Pulse = styled('div', {
  base: {
    width: '6',
    height: '6',
    rounded: 'xl',
    transition: 'all',
    transitionDuration: 'normal',
    transitionTimingFunction: 'pulse',
  },

  variants: {
    pulse: {
      buy: {
        shadow: 'md',
        bg: 'accent.default',
      },
      sell: {
        shadow: 'lg',
        bg: 'accent.2',
      },
    },
  },

  defaultVariants: {
    pulse: 'sell',
  },
})

export function Pulsar() {
  const pulse = useDataStreamStore(state => state.data[0]?.side)

  return <Pulse pulse={pulse} />
}
