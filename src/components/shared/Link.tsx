import type { PropsWithChildren } from 'react'
import { NavLink, type NavLinkProps } from 'react-router-dom'
import { Text } from '~/components/ui/text'

export function Link(props: PropsWithChildren<NavLinkProps>) {
  return (
    <NavLink {...props}>
      <Text
        _hover={{
          textDecoration: 'underline',
        }}
      >
        {props.children}
      </Text>
    </NavLink>
  )
}
