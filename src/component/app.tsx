import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { Time } from './time'
import useRainbow from '../hooks/useRainbow'
//@ts-ignore
import bellMp3 from '../audio/Meditation-bell-sound.mp3'

let count = 0

const tickDown = () => {
  count -= 1
}

const intervalDelay = 1300
const transitionDelay = intervalDelay * 4.25

export const App = () => {
  const bell = new Audio(bellMp3)
  const [counting, setCounting] = useState(false)
  const [done, setDone] = useState(false)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout>()
  const [time, setTimeVal] = useState('00:00:00')
  const [colorPos, setColorPos] = useState(0)

  const setTime = useCallback(
    (val: string) => {
      const parts = val.replace(/:/g, '')
      let shiftLeft = parts
      if (parts.length > 6) {
        shiftLeft = parts.substring(parts.length - 6)
      }
      setTimeVal(
        shiftLeft
          .padEnd(6, '0')
          .match(/.{1,2}/g)
          .join(':'),
      )
    },
    [setTimeVal],
  )

  const reset = useCallback(() => {
    setCounting(false)
    setDone(false)
    setTimeVal('00:00:00')

    count = 0
    setColorPos(0)

    if (timerInterval) {
      clearInterval(timerInterval)
      setTimerInterval(undefined)
    }
  }, [setCounting, setDone, setTime, timerInterval, setTimerInterval, setColorPos])

  const start = useCallback(() => {
    const convertTime = time.split(':').reduce((total, val, i) => {
      const s = parseInt(val, 10)
      if (i === 0) {
        return total + s * 60 * 60
      }
      if (i === 1) {
        return total + s * 60
      }
      return total + s
    }, 0)

    count = convertTime
    setColorPos(count)

    setCounting(true)
    setDone(false)
    bell.pause()
  }, [time, setCounting, setDone, setColorPos])

  useEffect(() => {
    if (!counting) return

    const t = setInterval(() => {
      tickDown()
      setColorPos(count)

      if (count <= 0) {
        clearInterval(t)
        setDone(true)
        setCounting(false)
        bell.play()
      }
    }, 1000)

    setTimerInterval(t)
  }, [counting, setColorPos, setDone, setCounting])

  const colors = useRainbow({ intervalCounter: colorPos })
  const colorKeys = Object.keys(colors)

  return (
    <ColorBox
      style={{
        ...colors,
        transition: `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear
        `,
        background: `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
      }}
    >
      <Time
        start={start}
        reset={reset}
        counting={counting}
        time={time}
        setTime={setTime}
        done={done}
      />
    </ColorBox>
  )
}

const ColorBox = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
