import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

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
      return { ...initialState, status: "ready", questions: state.questions };

    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [
    {questions, status, index, answer, points, highscore, timeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
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

  return (<QuizContext.Provider
    value={{
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      timeRemaining,
      questionsLength,
      maxPossiblePoints,

      dispatch
    }}
  >
    {children}
  </QuizContext.Provider>);
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside the QuizProvider");
  return context;
}

export { useQuiz, QuizProvider };
