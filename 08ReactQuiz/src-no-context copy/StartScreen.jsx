import React from 'react'

export default function StartScreen({StartScreen, dispatch}) {
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{StartScreen} questions to test your React mastery</h3>
        <button onClick={() => dispatch({type: "start"})} className="btn btn-ui">Let's Start</button>
    </div>
  )
}
