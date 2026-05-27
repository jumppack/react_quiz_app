import { useState } from 'react';

const QUIZ_QUESTION = {
  id: 'q1',
  question: "Which of the following is not a primitive data type in JavaScript?",
  options: ["String", "Number", "Boolean", "Object"],
  correctAnswer: "Object"
};

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitted) {
      // "Try Again" mode
      setSelectedOption(null);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      if (selectedOption !== null) {
        const correct = selectedOption === QUIZ_QUESTION.correctAnswer;
        setIsCorrect(correct);
        setSubmitted(true);
      }
    }
  };

  return (
    <main className="quiz-container">
      <div className="quiz-header">
        <span className="quiz-badge">JavaScript Quiz</span>
        <h1 className="quiz-question">{QUIZ_QUESTION.question}</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="options-list">
          {QUIZ_QUESTION.options.map((option, index) => {
            const isSelected = selectedOption === option;
            return (
              <label 
                key={option} 
                className={`option-label ${isSelected ? 'selected' : ''}`}
                htmlFor={`option-${index}`}
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                  checked={isSelected}
                  disabled={submitted}
                  onChange={() => setSelectedOption(option)}
                  className="option-radio"
                />
                <span className="option-text">{option}</span>
              </label>
            );
          })}
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={selectedOption === null}
        >
          {submitted ? 'Try Again' : 'Submit Answer'}
        </button>
      </form>

      {submitted && (
        <div className={`feedback-card ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-icon" aria-hidden="true">
            {isCorrect ? '🎉' : '❌'}
          </div>
          <div className="feedback-content">
            <h2 className="feedback-title">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </h2>
            <p>
              {isCorrect 
                ? 'Great job! Objects are non-primitive data types in JavaScript (they are passed by reference and can hold collections of properties).' 
                : 'That is not correct. Hint: Look for the non-primitive data type that can store collections of key-value pairs.'}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
