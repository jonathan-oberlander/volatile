import { Center } from '@styled-system/jsx'

import * as Table from '~/components/ui/table'
import { Text } from '~/components/ui/text'

import { useDataStreamStore, useDataStream } from '~/stores/dataStream'

export function LiveTable() {
  const data = useDataStream()

  const { connecting, streaming } = useDataStreamStore(s => ({
    connecting: !s.data?.length,
    sideFilter: s.sideFilter,
    streaming: s.streaming,
  }))

  if (connecting) {
    return (
      <Center h="full">
        <Text size="md">Waiting for Data</Text>
      </Center>
    )
  }

  return (
    <Table.Root bg={streaming ? 'bg.canvas' : 'bg.muted'}>
      <Table.Head position="sticky" top="0" bg="bg.canvas">
        <Table.Row>
          <Table.Header>Id</Table.Header>
          <Table.Header>Side</Table.Header>
          <Table.Header>Price</Table.Header>
          <Table.Header>Size</Table.Header>
          <Table.Header>Time</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((tick, i) => {
          const bidSizeFormat = (tick.best_bid_size * 100).toFixed(4)

          const timeFormat = Intl.DateTimeFormat('en', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            fractionalSecondDigits: 3,
            hour12: false,
          }).format(tick.time)

          return (
            <Table.Row
              key={`${tick.trade_id}_${i}`}
              css={{
                '&:nth-child(even)': {
                  bg: 'neutral.2',
                },
              }}
              _hover={{
                bg: 'gray.a2',
                cursor: 'pointer',
              }}
            >
              <Table.Cell>{tick.trade_id}</Table.Cell>
              <Table.Cell
                fontWeight="medium"
                color={tick.side === 'buy' ? 'accent.default' : 'fg.default'}
              >
                {tick.side}
              </Table.Cell>
              <Table.Cell fontWeight="medium">{tick.price}</Table.Cell>
              <Table.Cell>{bidSizeFormat}</Table.Cell>
              <Table.Cell>{timeFormat}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}
