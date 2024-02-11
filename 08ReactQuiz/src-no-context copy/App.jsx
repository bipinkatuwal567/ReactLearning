import { useEffect, useReducer } from "react";

import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import { Main1 } from "./Main1";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_ON_QUESTIONS = 20;

const initialState = {
  questions: [],
  // Status will be : "Loading", "Error", "Ready", "Active", "Finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SECS_ON_QUESTIONS,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextAnswer":
      return {
        ...state,
        index: state.index + 1,
        answer: (state.answer = null),
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return{...initialState, status: "ready", questions: state.questions}
    
    case 'tick':
      return{
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status
      }

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore, timeRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const questionsLength = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: "dataFailed",
        })
      );
  }, []);

  return (
    <div className="app">
      <Header />
      <Main1>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} questionsLength={questionsLength} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionsLength={questionsLength}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              questionsLength={questionsLength}
            />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main1>
    </div>
  );
}

export default App;
