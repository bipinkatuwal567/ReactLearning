import { useEffect, useState } from 'react'
import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);




  function handleStep(e){
    if(e.target.innerText === "-"){
      setStep(step => step-1);
    }

    if(e.target.innerText === "+"){
      setStep(step => step+1);
    }
  }

  function handleCount(e){
    if(e.target.innerText === "-"){
      setCount(count => count-step)
    }

    if(e.target.innerText === "+"){
      setCount(count => count+step)
    }
  }

  return (
    <div className="container">
        <div className="counter">
          <button onClick={(e) => handleStep(e)}>-</button>
          <p>Step : {step}</p>
          <button onClick={(e) => handleStep(e)}>+</button>
        </div>
        <div className="counter">
          <button onClick={(e) => handleCount(e)}>-</button>
          <p>
            Count : {count}
          </p>
          <button onClick={(e) => handleCount(e)}>+</button>
        </div>
        <div className="page">
          <p>
            {
              count === 0
              ?
              "Today is "
              :
              count > 0 
              ?
              `${count} days from today is ` 
              :
              `${Math.abs(count)} days ago was `
            }
            {date.toDateString()}
          </p>
        </div>
    </div>
  )
}

export default App
