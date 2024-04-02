import { css } from '@styled-system/css'
import { Box, Center, HStack, type HstackProps } from '@styled-system/jsx'
import { ArrowDown, ArrowUp, MoveDownRight, MoveUpRight } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { Text } from '~/components/ui/text'
import { useDataStreamStore } from '~/stores/dataStream'

export function Price() {
  const { high_24h, currencies, amplitude, price, ready, trend, movement } =
    useDataStreamStore(state => {
      const { price, high_24h, product_id, low_24h } = state.data[0] || {}

      return {
        ready: !!product_id,
        trend: price > high_24h,
        movement:
          state?.data?.length > 2 && state.data[0].price > state.data[1].price,
        price,
        high_24h,
        currencies: product_id?.split('-'),
        amplitude: (high_24h - low_24h).toFixed(2),
      }
    })

  return (
    <>
      {!ready ? (
        <Center>...</Center>
      ) : (
        <>
          <Info title="Range" value={`${amplitude} ${currencies[1]}`} />
          <Info title="Price" value={`${price.toFixed(2)} ${currencies[1]}`}>
            {movement ? (
              <ArrowUp className={css({ color: 'accent.default' })} />
            ) : (
              <ArrowDown className={css({ color: 'accent.default' })} />
            )}
          </Info>
          <Info
            title="High 24"
            value={`${high_24h.toFixed(2)} ${currencies[1]}`}
          >
            {trend ? (
              <MoveUpRight className={css({ color: 'accent.default' })} />
            ) : (
              <MoveDownRight className={css({ color: 'accent.default' })} />
            )}
          </Info>
        </>
      )}
    </>
  )
}

function Info({
  title,
  value,
  children,
  ...props
}: PropsWithChildren<{ title: string; value: string } & HstackProps>) {
  return (
    <HStack justifyContent="space-evenly" {...props}>
      <Box textAlign="end">
        <Text size="xs" fontWeight="light" color="neutral.9">
          {title}
        </Text>
        <Text size="xs" fontWeight="medium">
          {value}
        </Text>
      </Box>
      {children}
    </HStack>
  )
}
