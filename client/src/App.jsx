import {useState, useReducer} from 'react';
import Question from './components/Question';
import testQuestions from './data/questions.json';

function App() {

  // Lazy initialization, runs only once
  // const [questionIdx] = useState(() => 
  //   Math.floor(Math.random() * testQuestions.length)
  // );

  const reducer = (prevState, action) => {
    switch (action.type) {
        case 'next': 
            return {...prevState, index: prevState.index + 1};
        case 'prev':
            return {...prevState, index: prevState.index - 1};
        case 'scoreup':
            return {...prevState, score: prevState.score + 1};
        case 'restart':
            return {...prevState, index: 0, score: 0, answeredQuestions: new Set()};
        case 'answered': {
            const newAnswered = new Set(prevState.answeredQuestions);
            newAnswered.add(action.payload);
            return {...prevState, answeredQuestions: newAnswered};
        }
        default:
            return prevState;
    }
  }

  const initalState = {
    index: 0,
    score: 0,
    answeredQuestions: new Set()
  }


  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <>
      <Question 
        quizQuestion={testQuestions[state.index]}
        quizState={state}
        totalQuestions={testQuestions.length}
        dispatch={dispatch}/>
      <p className='score-display'>Currnet Score: {state.score}</p>
    </>
  );
}

export default App;
