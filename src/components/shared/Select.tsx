import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import * as Select from '~/components/ui/select'

type Item = { label: string; value: string }
export type SelectComponentProps = Select.RootProps & {
  items: Item[]
  label: string
  placeholder: string
}

export function SelectComponent({
  items,
  label,
  placeholder,
  ...props
}: SelectComponentProps) {
  return (
    <Select.Root
      positioning={{ sameWidth: true }}
      width="2xs"
      items={items}
      {...props}
    >
      <Select.Label>{label}</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
          <ChevronsUpDownIcon />
        </Select.Trigger>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup id={label}>
            <Select.ItemGroupLabel htmlFor={label}>
              {label}
            </Select.ItemGroupLabel>
            {items.map(item => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}
