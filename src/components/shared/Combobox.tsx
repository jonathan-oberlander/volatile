import type { ComboboxInputValueChangeDetails } from '@ark-ui/react'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import * as Combobox from '~/components/ui/combobox'
import { IconButton } from '~/components/ui/icon-button'
import { Input } from '~/components/ui/input'

type Data = {
  label: string
  value: string
}

export type ComboBoxProps = Combobox.RootProps & {
  data: Data[]
  label: string
  placeholder: string
}

export function ComboBoxComponent({
  data,
  placeholder,
  label,
  ...props
}: ComboBoxProps) {
  const [items, setItems] = useState(data)

  const handleChange = (e: ComboboxInputValueChangeDetails) => {
    const filtered = data.filter(item =>
      item.label.toLowerCase().includes(e.value.toLowerCase()),
    )
    setItems(filtered.length > 0 ? filtered : data)
  }

  return (
    <Combobox.Root
      width="2xs"
      onInputValueChange={handleChange}
      {...props}
      items={items}
    >
      <Combobox.Label>{label}</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} asChild>
          <Input />
        </Combobox.Input>
        <Combobox.Trigger asChild>
          <IconButton variant="link" aria-label="open" size="xs">
            <ChevronsUpDownIcon />
          </IconButton>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content maxH="lg" overflow="auto">
          <Combobox.ItemGroup id={label}>
            <Combobox.ItemGroupLabel htmlFor={label}>
              {label}
            </Combobox.ItemGroupLabel>
            {items.map(item => (
              <Combobox.Item key={item.value} item={item}>
                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                <Combobox.ItemIndicator>
                  <CheckIcon />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  )
}
