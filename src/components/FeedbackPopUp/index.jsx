import React, { useEffect } from "react";
import "../../assets/App.css";
import "./index.css";

const FeedbackPopUp = ({ buttonPressed, expectedOutcome, correctAnswer }) => {
  return (
    <div>
      { buttonPressed ? (
        <>
          { correctAnswer ? (
              <h1>You WIN</h1>
            ) : (
              <h1>False Alert, keep going, BUTTON PRESS</h1>
            )}
        </>
      ) : (
        correctAnswer ? (
          <>
          <h1>You LOOSE</h1>
          <p>CORRECT ANSWER: {expectedOutcome}</p>
          </>
        ) : (
          <h1>False Alert, keep going</h1>
        )
      )}
    </div>
  )
}

export default FeedbackPopUp;
