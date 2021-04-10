// Credit: https://github.com/joshwcomeau/blog/tree/master/src/components/MagicRainbowButton
import { useEffect, useRef } from 'react'

import { usePalette } from './usePalette'

const hasBrowserSupport =
  typeof window !== 'undefined'
    // @ts-ignore
    ? typeof window.CSS.registerProperty === 'function'
    : false

const getColorPropName = (id: string, index: number) => `--magic-rainbow-color-${id}-${index}`

type Props = {
  intervalCounter: number
  colorWindow?: number
}

const useRainbow = ({ intervalCounter, colorWindow = 3 }: Props) => {
  const { current: isEnabled } = useRef(hasBrowserSupport)
  const { current: uniqueId } = useRef(`_${Math.random().toString(36).substr(2, 9)}`)
  const { palette, paletteSize } = usePalette(50 + Math.floor(Math.random() * 30), 30 + Math.floor(Math.random() * 30))

  useEffect(() => {
    if (!isEnabled) {
      return
    }

    for (let i = 0; i < colorWindow; i += 1) {
      const name = getColorPropName(uniqueId, i)
      const initialValue = palette[i]

      // @ts-ignore
      CSS.registerProperty({
        name,
        initialValue,
        syntax: '<color>',
        inherits: false,
      })
    }
  }, [colorWindow, isEnabled, palette])

  let colors: Record<string, string> = {}
  const effectiveIntervalCount = isEnabled ? intervalCounter : 0

  for (let i = 0; i < colorWindow; i += 1) {
    const name = getColorPropName(uniqueId, i)
    colors[name] = palette[(effectiveIntervalCount + i) % paletteSize]
  }

  return colors
}

export default useRainbow
