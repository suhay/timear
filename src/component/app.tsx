import { useEffect, useReducer, useState } from "react"
import styled from 'styled-components'

import { Time } from './time'
import useRainbow from '../hooks/useRainbow'

export type Action =
  | { type: 'set'; count: number }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'increment' }

type State = {
  count: number
  initCount: number
}

const initialState: State = {
  count: 0,
  initCount: 0
}

export const App = () => {
  const intervalDelay = 1300
  const transitionDelay = intervalDelay * 4.25

  const [showInput, setShowInput] = useState(true)
  const [counting, setCounting] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const [state, dispatch] = useReducer<(state: State, action: Action) => State>((state: State, action: Action) => {
    switch (action.type) {
      case 'set':
        return {
          initCount: action.count,
          count: action.count
        }
      case 'decrement':
        if (state.count - 1 <= 0) {
          clearInterval(timer)
        }
        return {
          ...state,
          count: state.count - 1
        }
      case 'increment':
        return {
          ...state,
          count: state.count + 1
        }
      case 'reset':
        setCounting(false)
        setShowInput(true)
        if (timer) {
          clearInterval(timer)
          setTimer(undefined)
        }
        return {
          count: 0,
          initCount: 0
        }
      default:
        throw new Error()
    }
  }, initialState)

  useEffect(() => {
    if (!!state.count && !showInput && !counting) {
      setCounting(true)
      const t = setInterval(() => dispatch({ type: 'decrement' }), 1000)
      setTimer(t)
    }
    return clearInterval(timer)
  }, [showInput])

  const colors = useRainbow({ intervalCounter: state.count })
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
      <Time count={state.count} initCount={state.initCount} dispatch={dispatch} setShowInput={setShowInput} showInput={showInput} counting={counting} />
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
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