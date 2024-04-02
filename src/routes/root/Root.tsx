import { Flex, styled } from '@styled-system/jsx'
import { Outlet } from 'react-router-dom'

import { TopBar } from '~/routes/root/TopBar'

export function Root() {
  return (
    <styled.main display="flex" m="0" p="0" h="screen">
      <Flex flex="1" p="4">
        <Flex
          flexDirection="column"
          flex="1"
          borderRadius="md"
          overflow="hidden"
          shadow="md"
        >
          <Flex>
            <TopBar />
          </Flex>
          <Flex flex="auto" h="0" gap="2">
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </styled.main>
  )
}
