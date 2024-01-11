import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../assets/App.css';
import './index.css';

// Triggered when the game ends
const handleGameEnd = (summary) => {
  socket.emit("game_end", { room, summary });
};

// When the game ends, call handleGameEnd with the summary
handleGameEnd({
  won: true, // or false
  timeTaken: 120, // or your time calculation
  correctAnswers: ["Q1", "Q2", "Q3"],
  wrongAnswers: ["Q4"],
});

import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../assets/App.css';
import './index.css';

const FeedbackPopUp = ({ summary }) => {
  useEffect(() => {
    // Display SweetAlert when the component mounts
    showFeedback();
  }, []);

  const showFeedback = () => {
    const { won, timeTaken, correctAnswers, wrongAnswers } = summary;

    Swal.fire({
      icon: won ? 'success' : 'error',
      title: won ? 'Congratulations! You Won!' : 'Oops! You Lost!',
      html: won
        ? `<p>Time taken: ${timeTaken} seconds</p>
          <div>
            <h2>Correct Answers:</h2>
            <ul>${correctAnswers.map((answer) => `<li>${answer}</li>`).join('')}</ul>
          </div>
          <div>
            <h2>Wrong Answers:</h2>
            <ul>${wrongAnswers.map((answer) => `<li>${answer}</li>`).join('')}</ul>
          </div>`
        : `<p>The other player has already won. Better luck next time!</p>`,
    });
  };

  return null;
};

export default FeedbackPopUp;