import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import { Main1 } from "./Main1";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  // Status will be : "Loading", "Error", "Ready", "Active", "Finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
}

function reducer(state, action){
  switch(action.type){
    case 'dataReceived': 
      return {
        ...state, 
        questions: action.payload,
        status: "ready"
      }
    case 'dataFailed': 
    return {
      ...state, 
      status: "error"
    }
    case 'start': 
      return {
        ...state,
        status: "active"
      }
    case 'newAnswer':
      const question = state.questions.at(state.index);
      console.log(question)

      return{
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ? state.points + question.points : state.points
      }
    default :
      throw new Error("Action unknown");
  }
}

function App() {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);
  const questionsLength = questions.length;

  useEffect(() => {
    fetch("http://localhost:9000/questions")
    .then(res => res.json())
    .then(data => dispatch({
      type: "dataReceived",
      payload: data
    }))
    .catch(error => dispatch({
      type: "dataFailed"
    }))
  }, [])

  return (
    <div className="app">
      <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen dispatch={dispatch} questionsLength={questionsLength} /> }
        {status === "active" && <Question question={questions[index]} answer={answer} dispatch={dispatch} />}
    </div>
  )
}

export default App
