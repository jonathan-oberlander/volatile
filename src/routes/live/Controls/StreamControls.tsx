import { HStack, styled } from '@styled-system/jsx'
import type { Products } from '~/types/types'
import {
  HeartBeat,
  Price,
  ProductsCombobox,
  Pulsar,
  SideFilters,
  SizeSlider,
  SubscriptionButton,
} from '.'

export function StreamControls({ products }: { products: Products }) {
  return (
    <HStack
      w="full"
      p="2"
      justifyContent="space-around"
      shadow="sm"
      alignItems="center"
      gap="2"
    >
      <Group w="1/4">
        <SubscriptionButton />
        <ProductsCombobox products={products} />
      </Group>
      <Group w="1/2">
        <HeartBeat />
        <SizeSlider />
        <SideFilters />
        <Pulsar />
      </Group>
      <Group w="1/4">
        <Price />
      </Group>
    </HStack>
  )
}

const Group = styled(HStack, {
  base: {
    h: 'full',
    px: '3',
    gap: '2',
    shadow: 'sm',
    justifyContent: 'space-around',
    borderRadius: 'md',
  },
})
