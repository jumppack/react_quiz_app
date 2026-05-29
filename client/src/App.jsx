import { useReducer } from 'react';
import { useQuery } from '@tanstack/react-query';
import Question from './components/Question';

function App() {
  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'next': 
        return { ...prevState, index: prevState.index + 1 };
      case 'prev':
        return { ...prevState, index: prevState.index - 1 };
      case 'scoreup':
        return { ...prevState, score: prevState.score + 1 };
      case 'restart':
        return { ...prevState, index: 0, score: 0, answeredQuestions: new Set() };
      case 'answered': {
        const newAnswered = new Set(prevState.answeredQuestions);
        newAnswered.add(action.payload);
        return { ...prevState, answeredQuestions: newAnswered };
      }
      default:
        return prevState;
    }
  };

  const initialState = {
    index: 0,
    score: 0,
    answeredQuestions: new Set()
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch questions from Express API using TanStack Query
  const { data: questions, isLoading, isError, error } = useQuery({
    queryKey: ['questions'],
    queryFn: async () => {
      const response = await fetch('http://localhost:5001/api/questions');
      if (!response.ok) {
        throw new Error('Failed to fetch questions from the server');
      }
      return response.json();
    }
  });

  // Handle loading state in the same glassmorphic container
  if (isLoading) {
    return (
      <main className="quiz-container" style={{ textAlign: 'center' }}>
        <span className="quiz-badge">Loading</span>
        <h1 className="quiz-question">Loading questions from server...</h1>
      </main>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <main className="quiz-container" style={{ textAlign: 'center', borderColor: 'var(--error-border)' }}>
        <span className="quiz-badge" style={{ backgroundColor: 'var(--error-bg)', color: 'var(--error)' }}>Error</span>
        <h1 className="quiz-question" style={{ color: 'var(--error)' }}>Failed to load quiz</h1>
        <p style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
          {error?.message || 'Check that your MongoDB server and Express backend are running.'}
        </p>
      </main>
    );
  }

  // Handle empty database case
  if (!questions || questions.length === 0) {
    return (
      <main className="quiz-container" style={{ textAlign: 'center' }}>
        <span className="quiz-badge">Empty</span>
        <h1 className="quiz-question">No questions found in the database.</h1>
      </main>
    );
  }

  return (
    <>
      <Question 
        quizQuestion={questions[state.index]}
        quizState={state}
        totalQuestions={questions.length}
        dispatch={dispatch}
      />
      <p className="score-display">Current Score: {state.score}</p>
    </>
  );
}

export default App;
