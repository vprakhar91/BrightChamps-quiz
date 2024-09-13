import React from 'react';
import './QuizResult.css';

const QuizResult = ({ result, totalQuestions }) => {
  return (
    <div className="quiz-result">
      <h2>Quiz Result</h2>
      <p>Your Score: {result.percentage}%</p>
      <p>Total Questions: {totalQuestions}</p>

      {result.wrongAnswers.length > 0 ? (
        <div>
          <h3>Incorrect Answers</h3>
          {result.wrongAnswers.map((item, index) => (
            <div key={index} className="wrong-answer">
              <p><strong>Question:</strong> {item.question}</p>
              <p><strong>Your Answer:</strong> {item.selectedAnswer || "No Answer Selected"}</p>
              <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>All answers were correct!</p>
      )}
    </div>
  );
};

export default QuizResult;
