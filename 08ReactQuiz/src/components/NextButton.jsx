import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const {dispatch, answer, index, questionsLength} = useQuiz();
  if (answer === null) return;
  
  if(index < questionsLength - 1){
    return (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextAnswer" })}
        >
          Next
        </button>
      );
  }

  if(index === questionsLength - 1){
    return(
        <button className="btn btn-ui" 
        onClick={() => dispatch({type: 'finished'})}>
            Finish
        </button>
    )
  }
}
