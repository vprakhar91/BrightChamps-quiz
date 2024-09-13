import React, { useState, useEffect } from 'react';
import './QuizTaking.css';

const QuizTaking = ({ quiz, onQuizComplete }) => {
  const [answers, setAnswers] = useState(Array(quiz.length).fill(''));
  const [timeLeft, setTimeLeft] = useState(120); 
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
  
    if (timeLeft > 0 && !submitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit(); 
    }
  }, [timeLeft, submitted]);

  const handleAnswerChange = (qIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = value;
    setAnswers(updatedAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    const wrongAnswers = [];
    quiz.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        correct++;
      } else {
        wrongAnswers.push({
          question: q.question,
          selectedAnswer: answers[index],
          correctAnswer: q.correctAnswer,
        });
      }
    });
    const percentage = (correct / quiz.length) * 100;
    return { percentage, wrongAnswers };
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const result = calculateScore();
    onQuizComplete(result);
  };

  return (
    <div className="quiz-taking">
      <h2>Take Quiz</h2>
      <div className="timer">Time left: {timeLeft} seconds</div>
      {quiz.map((q, index) => (
        <div key={index} className="question-block">
          <p>{q.question}</p>
          {q.options.map((option, optIndex) => (
            <label key={optIndex} className="option-label">
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
                disabled={timeLeft === 0 || submitted}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="submit-btn"
        disabled={submitted || timeLeft === 0}
      >
        {timeLeft === 0 ? 'Time Up!' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default QuizTaking;
