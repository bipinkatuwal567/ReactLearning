import React from 'react'

const Content = ({onReset, children}) => {
  return (
    <div className='content'>
        {
            children
        }
        <button  onClick={(e) => onReset(e)}>Reset</button>
    </div>
  )
}

export default Content