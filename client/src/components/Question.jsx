import {useState} from 'react'

export default function Question ({quizQuestion}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const {question, options, correctAnswer} = quizQuestion;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (submitted) {
            // Try again logic
            setSubmitted(false);
            setSelectedOption(null);
            setIsCorrect(false);
            return;
        } else {
            if(!selectedOption) return;
            const correct = selectedOption === correctAnswer
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
                    const selected = option === selectedOption;
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
                    disabled={selectedOption === null}
                    className="submit-btn"
                >
                    {submitted ? "Try Again" : "Submit Answer"}
                </button>
            </form>

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