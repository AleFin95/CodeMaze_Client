import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../assets/App.css';
import './index.css';

const FeedbackPopUp = ({ won, timeTaken, correctAnswers, wrongAnswers }) => {
  useEffect(() => {
    // Display SweetAlert when the component mounts
    showFeedback();
  }, []);

  const showFeedback = () => {
    Swal.fire({
      icon: won ? 'success' : 'error',
      title: won ? 'Congratulations! You Won!' : 'Oops! You Lost!',
      html: `
        <p>Time taken: ${timeTaken} seconds</p>
        <div>
          <h2>Correct Answers:</h2>
          <ul>${correctAnswers.map((answer) => `<li>${answer}</li>`).join('')}</ul>
        </div>
        <div>
          <h2>Wrong Answers:</h2>
          <ul>${wrongAnswers.map((answer) => `<li>${answer}</li>`).join('')}</ul>
        </div>
      `,
    });
  };

  return null;
};

export default FeedbackPopUp;