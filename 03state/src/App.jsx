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
    console.log(e);
    if(e.target.innerHTML === "Next<span>👉</span>"){
      if(step < 3){
        setStep(step => step + 1);
      }
    }

    if(e.target.innerHTML === "<span>👈</span>Prev"
    ){
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
      
      <StepMessage step={step}>
        {messages[step-1]}
      </StepMessage>

      <div className="buttons">
        <Button bgColor="#7950f2" textColor="#fff" handleClick={handleClick}><span>👈</span>Prev</Button>
        <Button bgColor="#7950f2" textColor="#fff" handleClick={handleClick}>Next<span>👉</span></Button>
      </div>
    </div>
    }
    </>
  )
}

function StepMessage({step,children}){
  return(
    <div className="message">
      <h2>STEP : {step} </h2>
      {
        children
      }
    </div>
  )
}

function Button({bgColor, textColor, handleClick, children}){
  return(
    <button style={{backgroundColor: bgColor, color: textColor}} 
    onClick={(e) => handleClick(e)}>
      {
        children
      }
    </button>
  )
}

export default App
