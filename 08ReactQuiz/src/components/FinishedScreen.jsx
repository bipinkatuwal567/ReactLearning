import { useQuiz } from '../contexts/QuizContext';

export default function FinishedScreen() {
  const {points, maxPossiblePoints, highscore, dispatch} = useQuiz();
    const resultPercentage = (points / maxPossiblePoints) * 100;
    let emoji;

    if(resultPercentage === 100) emoji = "🎖️" ;
    if(resultPercentage >= 70 && resultPercentage <= 80) emoji = "😍";
    if(resultPercentage >=50 && resultPercentage < 70) emoji = "✌️";
    if(resultPercentage < 50) emoji = "🙅‍♂️";

  return (
    <>
    <p className="result">
        <span>{emoji}</span>You scored {points} out of {maxPossiblePoints} ({Math.ceil(resultPercentage)}%)
    </p>
    <p className="highscore">
        (Highscore : {highscore} points)
    </p>
    <button className="btn btn-ui" onClick={() => dispatch({type: 'restart'})}>
        Restart Quiz
    </button>
    </>
  )
}
