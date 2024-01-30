import { useEffect, useState } from 'react'
import './App.css'

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`


function App() {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchingCurr(){
      setLoading(true);
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
      const data = await res.json();
      setConvertedAmount(data.rates[to]);
      setLoading(false);
    }

    if(from === to) return setConvertedAmount(amount);
    fetchingCurr();
  }, [from, to, amount])

  function handleFrom(e){
    setFrom(e.target.value);
  }

  function handleTo(e){
    setTo(e.target.value);
  }

  function handleAmount(e){
    setAmount(e.target.value);
  }

  return (
    <>
      <div className='main'>
      <input 
        type="text"
        value={amount}
        onChange={handleAmount}
      />
      <select value={from} onChange={handleFrom} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={handleTo} disabled={loading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </div>
    <p>OUTPUT : {convertedAmount > 0 && convertedAmount}</p>
    </>
  )
}

export default App
