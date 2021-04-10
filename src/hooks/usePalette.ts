import { useRef } from 'react'

const generatePalette = (saturation: number, lightness: number) => {
  const colors = [
    `hsl(1deg, ${saturation}%, ${lightness}%)`, // red
    `hsl(25deg, ${saturation}%, ${lightness}%)`, // orange
    `hsl(40deg, ${saturation}%, ${lightness}%)`, // yellow
    `hsl(45deg, ${saturation}%, ${lightness}%)`, // yellow-green
    `hsl(66deg, ${saturation}%, ${lightness}%)`, // lime
    `hsl(130deg, ${saturation}%, ${lightness}%)`, // green
    `hsl(177deg, ${saturation}%, ${lightness}%)`, // aqua
    `hsl(230deg, ${saturation}%, ${lightness}%)`, // blue
    `hsl(240deg, ${saturation}%, ${lightness}%)`, // indigo
    `hsl(260deg, ${saturation}%, ${lightness}%)`, // violet
    `hsl(325deg, ${saturation}%, ${lightness}%)`, // pink
  ]

  for (let i = 0; i < colors.length; i += 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const t = colors[i]
    colors[i] = colors[j]
    colors[j] = t
  }

  return colors
}

export const usePalette = (saturation = 90, lightness = 55) => {
  const palette = useRef<string[]>(null);

  if (!palette.current) {
    palette.current = generatePalette(saturation, lightness);
  }

  return { palette: palette.current, paletteSize: palette.current.length }
}
