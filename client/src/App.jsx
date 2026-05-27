import {useState} from 'react';
import Question from './components/Question';
import testQuestions from './data/questions.json';

function App() {

  const [questionIdx] = useState(() => 
    Math.floor(Math.random() * testQuestions.length)
  );

  return (
    <>
      <Question quizQuestion={testQuestions[questionIdx]}/>
    </>
  );
}

export default App;
