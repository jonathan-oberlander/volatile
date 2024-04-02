import { useShallow } from 'zustand/react/shallow'

import * as RadioButtonGroup from '~/components/ui/radio-button-group'
import { useDataStreamStore } from '~/stores/dataStream'
import type { SideFilter } from '~/types/types'

export function SideFilters() {
  const { setSide, side } = useDataStreamStore(
    useShallow(s => ({
      setSide: s.setSideFilter,
      side: s.sideFilter,
    })),
  )

  const options: { value: SideFilter }[] = [
    { value: 'both' },
    { value: 'sell' },
    { value: 'buy' },
  ]

  return (
    <>
      <RadioButtonGroup.Root
        defaultValue="all"
        size="sm"
        variant="outline"
        onChange={e => {
          const side = (e.target as HTMLInputElement).value as SideFilter
          setSide(side)
        }}
        value={side}
      >
        {options.map((option, id) => (
          <RadioButtonGroup.Item key={id} value={option.value}>
            <RadioButtonGroup.ItemControl />
            <RadioButtonGroup.ItemText>
              {option.value}
            </RadioButtonGroup.ItemText>
          </RadioButtonGroup.Item>
        ))}
      </RadioButtonGroup.Root>
    </>
  )
}
