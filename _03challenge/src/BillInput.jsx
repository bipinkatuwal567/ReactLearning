import React from 'react'

const BillInput = ({billValue, onBillValueChange}) => {
    const billValueChange = billValue; 
  return (
    <div className='input'>
        <label htmlFor="bill">How much was the bill?</label>
        <input type="text" value={billValue} onChange={(e) => onBillValueChange(Number(e.target.value))} placeholder='Bill Value' name="bill"/>
    </div>
  )
}

export default BillInput