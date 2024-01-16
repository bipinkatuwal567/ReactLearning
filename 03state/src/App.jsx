import { useState } from 'react';
import './index.css';
 
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handleClick(e){
    if(e.target.innerText === "Next"){
      if(step < 3){
        setStep(step => step + 1);
      }
    }

    if(e.target.innerText === "Prev"){
      if(step > 1){
        setStep(step => step - 1);
      }
    }
  }

  return (
    <>
    { isOpen ? 
    <button className="close" onClick={() => {setIsOpen(isOpen => !isOpen)}}>&times;</button>
    : 
    <button className="close" onClick={() => {setIsOpen(isOpen => !isOpen)}}>&#8801;</button>
    }
    
    {
      isOpen && 
      <div className="steps">
      <div className="numbers">
        <div className={step >= 1 ? "active" : ""}>1</div>
        <div className={step >= 2 ? "active" : ""}>2</div>
        <div className={step >= 3 ? "active" : ""}>3</div>
      </div>

      <div className="message">
        {messages[step-1]}
      </div>

      <div className="buttons">
        <button onClick={(e) => {handleClick(e)}} style={{backgroundColor: '#7950f2', color: "#fff"}}>Prev</button>
        <button onClick={(e) => {handleClick(e)}} style={{backgroundColor: '#7950f2', color: "#fff"}}>Next</button>
      </div>
    </div>
    }
    </>
  )
}

export default App
