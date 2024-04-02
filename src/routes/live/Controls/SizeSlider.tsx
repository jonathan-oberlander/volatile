import { useShallow } from 'zustand/react/shallow'
import { Slider, type SliderProps } from '~/components/ui/slider'
import { useDataStreamStore } from '~/stores/dataStream'

export function SizeSlider(props: SliderProps) {
  const { setSize, size } = useDataStreamStore(
    useShallow(s => ({
      setSize: s.setDataSize,
      size: s.dataSize,
    })),
  )

  console.log('re-render-slider')

  return (
    <Slider
      fontVariant="all-small-caps"
      size="sm"
      maxW="1/2"
      min={10}
      max={200}
      marks={[
        { value: 10, label: '10' },
        { value: 50, label: '50' },
        { value: 100, label: '100' },
        { value: 150, label: '150' },
        { value: 200, label: '200' },
      ]}
      mb="5"
      value={[size]}
      onValueChange={({ value }) => setSize(value[0])}
      {...props}
    />
  )
}
