import styled, { css } from 'styled-components'

import { Action } from './app'

type Props = {
  count: number
  initCount: number
  showInput: boolean
  dispatch: React.Dispatch<Action>
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>
  counting: boolean
}

export const Time = ({ 
  count,
  initCount,
  showInput,
  dispatch,
  setShowInput,
  counting,
}: Props) => {
  return (
    <Section showInput={showInput} done={counting && !count}>
      {initCount <= count + 3 && (
        <div className='setTimer'>
          <input type={'number'} value={initCount} onChange={(e) => dispatch({ type: 'set', count: parseInt(e.target.value, 10) })} />
          <button onClick={() => setShowInput(false)}>Go</button>
        </div>
      )}
      {counting && !count && (
        <div className="done">
          <div>TIME!</div>
          <button onClick={() => {
            dispatch({ type: 'reset' })
          }}>Reset</button>
        </div>
      )}
    </Section>
  )
}

type SectionProps = {
  showInput: boolean
  done: boolean
}

const Section = styled.section`
  background: #00000014;
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 12px 5px #00000014;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: opacity 2s ease-in 1s;

  .done {
    display: none;
  }

  ${(props: SectionProps) => props.showInput && css`
    opacity: 1;
  `}

  ${(props: SectionProps) => props.done && css`
    opacity: 1;

    .done {
      display: flex;
    }
  `}

  input {
    display: flex;
    width: 50px;
    background: none;
    border: 0;
    text-align: center;
    font-size: 30px;
    color: #FFF;
    padding: 5px 9px;
  }

  button {
    background: none;
    border: 0;
    font-size: 30px;
    color: #FFF;
    cursor: pointer;
  }
`