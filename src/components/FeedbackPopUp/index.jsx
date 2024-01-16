import React, { useEffect } from 'react';
import '../../assets/App.css';
import './index.css';

const FeedbackPopUp = ({ buttonPressed }) => {
  return (
    <div>
      {buttonPressed ? (
        <h1>You WIN</h1>
      ) : (
        <h1>You LOOSE</h1>
      )}
    </div>
  )
}

export default FeedbackPopUp
