import axios, { type AxiosResponse } from 'axios'
import { Suspense } from 'react'
import {
  Await,
  type LoaderFunction,
  defer,
  useLoaderData,
} from 'react-router-dom'

import { Box, Center, Flex } from '@styled-system/jsx'
import type { Products } from '~/types/types'

import { Chart } from './Chart/Chart'
import { StreamControls } from './Controls/StreamControls'
import { LiveTable } from './Table/Table'

export const loader: LoaderFunction = () => {
  const response = axios.get<Products>(
    `${import.meta.env.VITE_COINBASE_API}/products`,
  )
  return defer({ response })
}

export function Live() {
  const { response } = useLoaderData() as { response: AxiosResponse<Products> }

  return (
    <Suspense
      fallback={
        <Flex flexDirection="column" flex="1">
          <Center h="full">Loading coinbase products...</Center>
        </Flex>
      }
    >
      <Await resolve={response}>
        {(response: AxiosResponse<Products>) => (
          <Flex flexDirection="column" flex="1">
            <Flex>
              <StreamControls products={response.data} />
            </Flex>
            <Flex flex="auto" gap="4" p="4" h="0">
              <Box w="full" overflowY="auto" shadow="sm" borderRadius="md">
                <LiveTable />
              </Box>
              <Box w="full" overflowY="hidden" shadow="sm" borderRadius="md">
                <Chart />
              </Box>
            </Flex>
          </Flex>
        )}
      </Await>
    </Suspense>
  )
}
