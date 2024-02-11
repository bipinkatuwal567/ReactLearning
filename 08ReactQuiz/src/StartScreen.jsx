import { useQuiz } from './contexts/QuizContext'

export default function StartScreen() {
  const {dispatch, questionsLength} = useQuiz();
  return (
    <div className='start'>
        <h2>Welcome to the React Quiz!</h2>
        <h3>{questionsLength} questions to test your React mastery</h3>
        <button onClick={() => dispatch({type: "start"})} className="btn btn-ui">Let's Start</button>
    </div>
  )
}
