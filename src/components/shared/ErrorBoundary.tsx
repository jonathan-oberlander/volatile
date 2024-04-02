import { Stack } from '@styled-system/jsx'
import { useNavigate, useRouteError } from 'react-router-dom'

import { Button } from '../ui/button'
import { Text } from '../ui/text'

export function ErrorBoundary() {
  const error = useRouteError() as Error
  const navigate = useNavigate()

  return (
    <>
      <Stack p="4" my="2" alignSelf="flex-start" gap="2">
        <Text as="h3" fontSize="lg">
          Error Boundary
        </Text>
        <Text as="p" fontSize="sm">
          <pre>
            {error.name}
            <br />
            {error.message}
            <br />
            {error.stack}
          </pre>
        </Text>
        <Button w="fit" onClick={() => navigate('/')}>
          Home
        </Button>
      </Stack>
    </>
  )
}
