import React, { useState, useEffect } from 'react';
import QuizCreation from './components/QuizCreation';
import QuizResult from './components/QuizResult';
import './App.css';

function App() {
  const [quiz, setQuiz] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [usePreAddedQuiz, setUsePreAddedQuiz] = useState(false);
  const [answers, setAnswers] = useState(Array(10).fill('')); 

  const preAddedQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 'Mars',
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Wordsworth', 'William Shakespeare', 'George Orwell', 'Leo Tolstoy'],
      correctAnswer: 'William Shakespeare',
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
      correctAnswer: 'Pacific Ocean',
    },
    {
      question: 'Which element has the chemical symbol "O"?',
      options: ['Oxygen', 'Osmium', 'Oganesson', 'Oxalate'],
      correctAnswer: 'Oxygen',
    },
    {
      question: 'Who developed the theory of general relativity?',
      options: ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Nikola Tesla'],
      correctAnswer: 'Albert Einstein',
    },
    {
      question: 'Which country hosted the 2016 Summer Olympics?',
      options: ['China', 'Brazil', 'United Kingdom', 'Russia'],
      correctAnswer: 'Brazil',
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Iron', 'Diamond', 'Granite'],
      correctAnswer: 'Diamond',
    },
  ];

  useEffect(() => {
    if (startQuiz && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && startQuiz) {
      handleQuizComplete(); 
    }
  }, [startQuiz, timeLeft]);

  const handleQuizSave = (questions) => {
    setQuiz(questions);
    setStartQuiz(true);
  };

  const handleQuizComplete = () => {
    const finalResult = calculateScore();
    setQuizResult(finalResult);
    setStartQuiz(false);
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

  const startPreAddedQuiz = () => {
    setQuiz(preAddedQuestions);
    setUsePreAddedQuiz(true);
    setStartQuiz(true);
  };

  return (
    <div className="App">
      {!startQuiz && quizResult === null ? (
        <div>
          <button onClick={startPreAddedQuiz} className="start-preadded-quiz-btn">
            Start Pre-Added Quiz
          </button>
          <QuizCreation onSaveQuiz={handleQuizSave} />
        </div>
      ) : quizResult === null ? (
        <div className="quiz-taking-container">
          <div className="timer">Time left: {timeLeft} seconds</div>
          <div className="quiz-taking">
            {quiz.map((q, index) => (
              <div key={index} className="question-block">
                <p><strong>Q{index + 1}:</strong> {q.question}</p>
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="option-label">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => {
                        const updatedAnswers = [...answers];
                        updatedAnswers[index] = option;
                        setAnswers(updatedAnswers);
                      }}
                      disabled={false} 
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <button onClick={handleQuizComplete} className="submit-btn">
            Submit Quiz
          </button>
        </div>
      ) : (
        <QuizResult result={quizResult} totalQuestions={quiz.length} />
      )}
    </div>
  );
}

export default App;
