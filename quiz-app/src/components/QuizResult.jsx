import React, { useEffect, useState } from 'react';
import '../styles/QuizResult.css'; // Import external CSS file
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function QuizResult() {
  const [feedback, setFeedback] = useState('');
  const [achived,setAchived] = useState('');
  const location = useLocation();
  const { questions, selectedOptions, score } = location.state;


  useEffect(() => {
    if (score < 10) {
      setAchived('You need to prepare well.');
    } else if (score >= 10 && score < 30) {
      setAchived('You are making progress. Keep going!');
    } else if (score >= 30 && score < 50) {
      setAchived('Great effort! You are on the right track.');
    } else if (score >= 50 && score < 80) {
      setAchived('Excellent job! You are doing very well.');
    } else if (score >= 80 && score <= 99) {
      setAchived('Amazing! You are almost there. Keep pushing!');
    } else {
      setAchived('Congratulations! You have achieved a perfect score!');
    }
  }, [score]);


  const handleChange = (event) => {
    setFeedback(event.target.value);
  };
  const data = JSON.parse(sessionStorage.getItem('user'));
  // console.log('data', data);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const userFeedback =
      {
        username: data.name,
        feedback
      }
      const response = await axios.post('http://localhost:5000/api/feedback', userFeedback)
      console.log('Feedback submitted:', feedback);
      setFeedback('');
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="quiz-result-container">
      <h2 className="quiz-result-heading">Quiz Result</h2>
      <p className="score-text">Score: {score}/100</p>
      <p className="archived-text"> {achived}</p>
      {questions?.map((question, index) => (
        <div key={index} className="question-result">
          <h3 className="question"> {index + 1}) {question.question}</h3>
          <div className="answer-details">
            <p className="selected-answer"><b>Selected Answer :</b> {selectedOptions[index]}</p>
            <p className="correct-answer"><b> Correct Answer :</b> {question.correct_answer}</p>
            <p className="explanation"><b>Explanation:</b>{question.explanation}</p>
          </div>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="feedback" className="feedback-label">Please provide your feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            cols="50"
            value={feedback}
            onChange={handleChange}
            className="feedback-textarea"
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
      <p className="home-link-text">Click below to go home</p>
      <button className="home-btn">
        <a className="home-link" href="/main">Home</a>
      </button>
    </div>

  );
}

export default QuizResult;
