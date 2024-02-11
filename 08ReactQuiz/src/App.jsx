

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
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const {status} = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main1>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen/>
        )}
        {status === "active" && (
          <>
            <Progress/>
            <Question/>
            <Footer>
              <Timer/>
            <NextButton/>
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedScreen/>
        )}
      </Main1>
    </div>
  );
}

export default App;
