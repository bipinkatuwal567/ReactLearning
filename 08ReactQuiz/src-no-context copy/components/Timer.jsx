import React, { useEffect } from 'react'

export default function Timer({dispatch, timeRemaining}) {
    const min = Math.ceil(timeRemaining / 60);
    const sec = Math.ceil(timeRemaining % 60);

    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: 'tick'})
        }, 1000);
        return () => clearInterval(id);
    },[dispatch])

  return (
    <div className="timer">
        {min < 10 && "0"}
        {min} 
        : 
        {sec < 10 && "0"}
        {sec}</div>
  )
}
