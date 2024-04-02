import { useSearchParams } from 'react-router-dom'
import { ComboBoxComponent } from '~/components/shared/Combobox'
import { useDataStreamStore } from '~/stores/dataStream'
import type { Products } from '~/types/types'

export function ProductsCombobox({ products }: { products: Products }) {
  const reset = useDataStreamStore(s => s.resetData)

  const items = products.map(v => ({ value: v.id, label: v.display_name }))

  const [searchParams, setSearchParams] = useSearchParams()
  const match = searchParams.get('match') ?? 'ETH-USD'

  return (
    <ComboBoxComponent
      label=""
      css={{
        transform: 'translateY(-3px)',
      }}
      placeholder="Select a product"
      data={items}
      items={items}
      name="match"
      defaultValue={['ETH-USD']}
      value={[match]}
      zIndex="dropdown"
      onValueChange={e => {
        reset()
        setSearchParams({
          match: e.value,
        })
      }}
    />
  )
}
