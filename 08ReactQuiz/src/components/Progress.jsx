import React from 'react'
import { useQuiz } from '../contexts/QuizContext'

export default function Progress() {
  const {index, questionsLength, points, answer, maxPossiblePoints} = useQuiz();

  return (
    <header className="progress">
        <progress max={questionsLength}  value={index + Number(answer !== null)} />
        <p>Question <strong>{index +1}</strong>/{questionsLength}</p>
        <p><strong>{points}</strong>/{maxPossiblePoints}</p>
    </header>
  )
}
