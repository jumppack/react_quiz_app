import {useState, useEffect} from 'react';
import Question from './components/Question';
import testQuestions from './data/questions.json';

function App() {

  const [questionIdx, setQuestionIdx] = useState(null);

  useEffect( () => {
    const idx = Math.floor(Math.random() * testQuestions.length);
    setQuestionIdx(idx);
  }, []);

  if(questionIdx === null) {
    return <p>Loading ...</p>
  }

  return (
    <>
      <Question quizQuestion={testQuestions[questionIdx]}/>
    </>
  );
}

export default App;
