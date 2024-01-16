import { useState } from 'react'
import './index.css'

function App() {
  const [range, setRange] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);


  function handleClick(e) {
    if (e.target.innerText === "-") {
      setCount(count => count - range)
    }

    if (e.target.innerText === "+") {
      setCount(count => count + range)
    }
  }

  function handleReset() {
    setRange(1);
    setCount(0);
  }

  return (
    <div className="container">
      <div className="range">
        <input type="range" value={range} onChange={(e) => setRange(Number(e.target.value))} min={1} max={10} />
        <label>{range}</label>
      </div>

      <div className="count">
        <button onClick={(e) => handleClick(e)}>-</button>
        <input type="text" value={count} onChange={(e) => setCount(Number(e.target.value))} />
        <button onClick={(e) => handleClick(e)}>+</button>
      </div>

      <div className="content">
        <p>{
          count === 0
            ?
            `Today is ${date.toDateString()}`
            :
            count > 0
              ?
              `${count} day after today is ${date.toDateString()}`
              :
              `${Math.abs(count)} day ago was ${date.toDateString()}`
        }</p>
      </div>

      {
        (count !== 0 || range !== 1)
        &&
        <div className='reset'>
          <button onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      }
    </div>
  )
}

export default App
