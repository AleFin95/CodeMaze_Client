import React, { useEffect } from "react";
import "../../assets/App.css";
import "./index.css";
import React, { useEffect } from "react";
import "../../assets/App.css";
import "./index.css";
import { Link } from "react-router-dom";

const FeedbackPopUp = ({
  buttonPressed,
  expectedOutcome,
  correctAnswer,
  onClose,
  autoClose,
  gameFinish,
  handleCancel,
}) => {
  useEffect(() => {
    if (!correctAnswer && autoClose) {
      const timerId = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [correctAnswer, autoClose]);

  return (
    <div>
      {buttonPressed ? (
        <>
          {correctAnswer ? (
            <>
              <h1>You WON!!</h1>
              <button onClick={gameFinish}>Exit Game</button>
            </>
          ) : (
            <h1>Incorrect code</h1>
          )}
        </>
      ) : correctAnswer ? (
        <>
          <h1>You LOST</h1>
          <p>The CORRECT ANSWER was: {expectedOutcome}</p>
          <Link to="/">
            <button onClick={handleCancel}>Exit Game</button>
          </Link>
        </>
      ) : (
        <h1>Your opponents code didn't work</h1>
      )}
    </div>
  );
};

export default FeedbackPopUp;
