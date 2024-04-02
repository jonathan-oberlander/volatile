import { Flex, HStack } from '@styled-system/jsx'
import { HandCoins } from 'lucide-react'

import { Link } from '~/components/shared/Link'
import { Heading } from '~/components/ui/heading'
import { Text } from '~/components/ui/text'
import { ColorMode } from '~/routes/root/ColorMode'

export function TopBar() {
  return (
    <HStack w="full" p="4" justifyContent="space-between" bg="bg.subtle">
      <Heading size="4xl" fontWeight="normal">
        <Flex gap="2">
          <HandCoins size={48} strokeWidth="1.25" />
          <Text fontWeight="light">volatile</Text>
        </Flex>
      </Heading>
      <HStack>
        <nav>
          <Link
            to={{
              pathname: 'live',
              search: '?match=ETH-USD',
            }}
          >
            Go!
          </Link>
        </nav>
        <ColorMode />
      </HStack>
    </HStack>
  )
}
