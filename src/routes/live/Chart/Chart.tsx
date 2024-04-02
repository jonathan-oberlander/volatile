import { css } from '@styled-system/css'

import { Center, HStack, Stack } from '@styled-system/jsx'
import { useState } from 'react'
import {
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Switch } from '~/components/ui/switch'
import { useDataStream } from '~/stores/dataStream'

type ChartFiltersState = {
  showReferenceLines: boolean
  viewBidSize: boolean
  price: boolean
}

export const Chart = () => {
  const [state, setState] = useState<ChartFiltersState>({
    showReferenceLines: false,
    viewBidSize: false,
    price: true,
  })

  const data = useDataStream()
    .map(d => ({ ...d, best_bid_size: d.best_bid_size * 100 }))
    .reverse()

  if (!data.length) {
    return <Center h="full">Loading Data</Center>
  }

  const first = data[data.length - 1]
  const referenceLine = { high: first.high_24h, low: first.low_24h }

  return (
    <Stack p="4">
      <ChartControls state={state} setState={setState} />
      <ResponsiveContainer
        width="100%"
        height={500}
        className={css({ p: '2' })}
      >
        <LineChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Tooltip
            labelFormatter={(d: Date) =>
              `time: ${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`
            }
          />
          <Legend verticalAlign="top" height={36} />
          <XAxis
            dataKey="time"
            tickCount={50}
            domain={['dataMin', 'dataMax']}
            tickSize={16}
            tickFormatter={t => {
              const d = new Date(t)
              return `${d.getSeconds()}:${d.getMilliseconds()}`
            }}
            className={css({
              fontSize: 'xs',
            })}
            hide={!state.price}
          />
          <YAxis
            yAxisId="1"
            dataKey="price"
            domain={
              state.showReferenceLines
                ? [referenceLine.low, referenceLine.high]
                : ['dataMin', 'dataMax']
            }
            padding={{
              top: 15,
              bottom: 15,
            }}
            className={css({
              fontSize: 'xs',
            })}
            hide={!state.price}
          />
          <Line
            yAxisId="1"
            type="monotone"
            dataKey="price"
            stroke="var(--colors-accent-10)"
            dot={false}
            activeDot={{ r: 8 }}
            isAnimationActive={false}
            hide={!state.price}
          />
          {state.showReferenceLines && state.price && (
            <>
              <ReferenceLine
                yAxisId="1"
                y={referenceLine.high}
                stroke="green"
                strokeDasharray="5 7"
              />
              <ReferenceLine
                yAxisId="1"
                y={referenceLine.low}
                stroke="red"
                strokeDasharray="5 7"
              />
            </>
          )}
          <>
            <YAxis
              dataKey="best_bid_size"
              orientation="right"
              allowDataOverflow
              domain={['dataMin', 'dataMax']}
              type="number"
              yAxisId="2"
              padding={{
                top: 15,
                bottom: 15,
              }}
              className={css({
                fontSize: 'xs',
              })}
              stroke="var(--colors-neutral-9)"
              hide={!state.viewBidSize}
              tickFormatter={t => t.toFixed(2)}
            />
            <Line
              yAxisId="2"
              type="monotone"
              dataKey="best_bid_size"
              stroke="var(--colors-neutral-9)"
              dot={false}
              isAnimationActive={false}
              hide={!state.viewBidSize}
            />
          </>
        </LineChart>
      </ResponsiveContainer>
    </Stack>
  )
}

function ChartControls({
  state,
  setState,
}: {
  state: ChartFiltersState
  setState: React.Dispatch<React.SetStateAction<ChartFiltersState>>
}) {
  return (
    <HStack w="full" justifyContent="flex-end" p="1">
      <HStack>
        <Switch
          size="sm"
          checked={state.price}
          onChange={e => {
            const { checked } = e.target as HTMLInputElement
            setState(s => ({ ...s, price: checked }))
          }}
        >
          price
        </Switch>
        <Switch
          size="sm"
          disabled={!state.price}
          checked={state.price && state.showReferenceLines}
          onChange={e => {
            const { checked } = e.target as HTMLInputElement
            setState(s => ({
              ...s,
              showReferenceLines: checked,
            }))
          }}
        >
          min/max
        </Switch>
      </HStack>
      <Switch
        size="sm"
        checked={state.viewBidSize}
        onChange={e => {
          const { checked } = e.target as HTMLInputElement
          setState(s => ({ ...s, viewBidSize: checked }))
        }}
      >
        best bid size
      </Switch>
    </HStack>
  )
}
