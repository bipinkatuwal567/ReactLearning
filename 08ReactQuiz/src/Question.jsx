import Options from './components/Options';
import { useQuiz } from './contexts/QuizContext';

function Question() {
  const {questions, index} = useQuiz();
  // console.log(questions);
  const question = questions[index];
  // console.log(question);
  return (
    <div>
        <h4>{question.question}</h4>
        <Options question={question}/>
    </div>
  )
}

export default Question