import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '~/components/ui/button'
import { useLazyRef } from '~/lib/utils'

type ColorMode = 'light' | 'dark'

class DocumentColorMode {
  private _mql = matchMedia('(prefers-color-scheme: light)')

  get mql() {
    return this._mql
  }

  applyColorMode = (colorMode: ColorMode) =>
    document.documentElement.setAttribute('data-color-mode', colorMode)

  readColorMode = () =>
    (document.documentElement.getAttribute('data-color-mode') ?? undefined) as
      | ColorMode
      | undefined

  flipColorMode = (): ColorMode =>
    this.readColorMode() === 'light' ? 'dark' : 'light'

  getPrefersColorScheme = (): ColorMode =>
    this._mql.matches ? 'light' : 'dark'

  toggleColorMode = () => this.applyColorMode(this.flipColorMode())

  setColorMode = () => this.applyColorMode(this.getPrefersColorScheme())

  addListener = () => this._mql.addEventListener('change', this.setColorMode)

  removeListener = () =>
    this._mql.removeEventListener('change', this.setColorMode)
}

const useColorMode = () => {
  const colorMode = useLazyRef(() => new DocumentColorMode())

  useEffect(() => {
    colorMode.setColorMode()
    colorMode.addListener()

    return () => {
      colorMode.removeListener()
    }
  }, [colorMode])

  return colorMode
}

export function ColorMode() {
  const [colorMode, setMode] = useState<ColorMode | undefined>()
  const { toggleColorMode, flipColorMode } = useColorMode()

  useEffect(() => {
    setMode(flipColorMode()) // set icon state
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
