import styled, { css } from 'styled-components'

type Props = {
  time: string
  start: () => void
  reset: () => void
  setTime: (val: string) => void
  counting: boolean
  done: boolean
}

export const Time = ({ time, start, reset, setTime, done, counting }: Props) => {
  return (
    <Section counting={counting} done={done}>
      {done && <div className='done'>Time!</div>}
      <div className='setTimer'>
        <input
          placeholder='00:00:00'
          pattern='[0-9]{2}:[0-9]{2}:[0-9]{2}'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={() => start()}>Go</button>
        {done && <button onClick={() => reset()}>Reset</button>}
      </div>
    </Section>
  )
}

type SectionProps = {
  counting: boolean
  done: boolean
}

const Section = styled.section`
  font-family: 'helvetica';
  display: flex;
  opacity: 0;
  flex-direction: column;
  transition: opacity 2s ease-in 1s;

  .done {
    justify-content: center;
    color: #fff;
    font-size: 30px;
    display: none;
  }

  ${(props: SectionProps) =>
    !props.counting &&
    css`
      opacity: 1;
    `}

  ${(props: SectionProps) =>
    props.done &&
    css`
      opacity: 1;

      .done {
        display: flex;
      }
    `}

  input {
    display: flex;
    background: none;
    border: 0;
    text-align: center;
    font-size: 30px;
    color: #fff;
    padding: 5px 9px;
    width: 150px;
  }

  button {
    background: none;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    border: 2px solid;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    margin-left: 8px;
  }

  .setTimer {
    display: flex;
  }
`
