import type { PropsWithChildren } from 'react'
import * as Tooltip from '~/components/ui/tooltip'

export function TooltipWrapper(
  props: PropsWithChildren<Tooltip.RootProps> & { content: string },
) {
  return (
    <Tooltip.Root {...props} openDelay={100}>
      <Tooltip.Trigger>{props.children}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        <Tooltip.Content>{props.content}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
