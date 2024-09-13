import React, { useState } from 'react';
import './QuizCreation.css';

const QuizCreation = ({ onSaveQuiz }) => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleSave = () => {
    onSaveQuiz(questions);
  };

  return (
    <div className="quiz-creation">
      <h2>Create Quiz</h2>
      {questions.map((q, index) => (
        <div key={index} className="question-block">
          <input
            type="text"
            placeholder="Enter question"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            className="question-input"
          />
          {q.options.map((option, optIndex) => (
            <input
              key={optIndex}
              type="text"
              placeholder={`Option ${optIndex + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
              className="option-input"
            />
          ))}
          <input
            type="text"
            placeholder="Correct answer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            className="correct-answer-input"
          />
        </div>
      ))}
      <button onClick={addQuestion} className="add-question-btn">Add Question</button>
      <button onClick={handleSave} className="save-quiz-btn">Save Quiz</button>
    </div>
  );
};

export default QuizCreation;
