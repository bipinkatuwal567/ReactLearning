import React from 'react'

export default function Progress({index, questionsLength, points, answer, maxPossiblePoints}) {

  return (
    <header className="progress">
        <progress max={questionsLength}  value={index + Number(answer !== null)} />
        <p>Question <strong>{index +1}</strong>/{questionsLength}</p>
        <p><strong>{points}</strong>/{maxPossiblePoints}</p>
    </header>
  )
}
