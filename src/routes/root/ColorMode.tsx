import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '~/components/ui/button'
import { useLazyRef } from '~/lib/utils'

type ColorMode = 'light' | 'dark'

class DocumentColorMode {
  mql = matchMedia('(prefers-color-scheme: light)')

  applyColorMode = (colorMode: ColorMode) =>
    document.documentElement.setAttribute('data-color-mode', colorMode)

  readColorMode = () =>
    (document.documentElement.getAttribute('data-color-mode') ?? undefined) as
      | ColorMode
      | undefined

  flipColorMode = (): ColorMode =>
    this.readColorMode() === 'light' ? 'dark' : 'light'

  getPrefersColorScheme = (): ColorMode => (this.mql.matches ? 'light' : 'dark')

  toggleColorMode = () => this.applyColorMode(this.flipColorMode())

  setColorMode = () => this.applyColorMode(this.getPrefersColorScheme())
}

const useColorMode = () => {
  const colorMode = useLazyRef(() => new DocumentColorMode())

  useEffect(() => {
    colorMode.setColorMode()

    const mql = matchMedia('(prefers-color-scheme: light)')
    mql.addEventListener('change', colorMode.setColorMode)

    return () => {
      mql.removeEventListener('change', colorMode.setColorMode)
    }
  }, [colorMode])

  return colorMode
}

export function ColorMode() {
  const [colorMode, setMode] = useState<ColorMode | undefined>()
  const { toggleColorMode, flipColorMode } = useColorMode()

  useEffect(() => {
    setMode(flipColorMode())
  }, [flipColorMode])

  return (
    <Button
      variant="ghost"
      onClick={() => {
        toggleColorMode()
        setMode(colorMode === 'light' ? 'dark' : 'light')
      }}
    >
      {colorMode === 'light' ? <Sun /> : <Moon />}
    </Button>
  )
}
