import {useState} from 'react'

export default function Question ({quizQuestion, quizState, totalQuestions, dispatch}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
 
    const {question, options, correctAnswer} = quizQuestion;

    const resetState = () => {
        setSelectedOption(null);
        setSubmitted(false);
        setIsCorrect(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (submitted) {
            // Try again logic
            resetState();
            return;
        } else {
            if(!selectedOption) return;
            const correct = selectedOption === correctAnswer
            if (correct) {
                if (!quizState.answeredQuestions.has(quizState.index)) {
                    dispatch({type: "scoreup"})
                    dispatch({type: "answered", payload: quizState.index});
                }
            }
            setIsCorrect(correct);
            setSubmitted(true);
        }
    }

    return (
        <main className="quiz-container">
            <div className="quiz-header">
                <span className="quiz-badge">JavaScript Quiz</span>
                <h1 className="quiz-question">{question}</h1>
            </div>
            
            <form onSubmit={handleSubmit}>
                {options.map( (option, index) => {
                    let selected;
                    if (quizState.answeredQuestions.has(quizState.index)) {
                        selected = option === correctAnswer
                    } else {
                        selected = option === selectedOption;
                    }
                    return (
                        <label 
                            key={option} 
                            className={`option-label ${selected ? 'selected' : ''}`}
                            htmlFor={`option-${index}`}
                        >
                            <input 
                                type="radio"
                                id={`option-${index}`}
                                name="quiz-option"
                                value={option}
                                checked={selected}
                                disabled={submitted}
                                onChange={ () => setSelectedOption(option)}
                                className="option-radio"
                            />
                            <span className="option-text">{option}</span>
                        </label>
                    )
                })}

                <button
                    type="submit"
                    disabled={ selectedOption === null}
                    className="submit-btn"
                >
                    {submitted ? "Try Again" : "Submit Answer"}
                </button>
            </form>

            <div className="navigationButtons">
                <button
                disabled = {quizState.index === 0}
                onClick={() => {
                    dispatch({type: 'prev'});
                    resetState();
                }}
                className="submit-btn"
                >
                    Previous
                </button>

                {(quizState.index === totalQuestions - 1) ? (
                    <button 
                        className="submit-btn"
                        disabled={!submitted}
                        onClick={() => {
                            dispatch({type: 'restart'});
                            resetState();
                            }}>
                        Restart
                    </button>
                ) : (   
                    <button
                        disabled = {!quizState.answeredQuestions.has(quizState.index)}
                    onClick={() => {
                        dispatch({type: 'next'});
                        resetState();
                    }}
                    className="submit-btn"
                    >
                        Next
                    </button>
                )}
            </div>

            {submitted &&
                <div className={`feedback-card ${isCorrect ? "correct" : "incorrect"}`}>
                    <div className="feedback-icon" >
                        {isCorrect ? "🎉" : "❌"}
                    </div>
                    <div className="feedback-content">
                        <h2 className="feedback-title">
                            {isCorrect ? "Correct!" : "Incorrect"}
                        </h2>
                        <p>
                            {isCorrect
                                ? "You selected the correct answer. Great job!"
                                : "That is not correct."}
                        </p>
                    </div>
                </div>
            }
        </main>
    )
}