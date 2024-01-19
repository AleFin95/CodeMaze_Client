const GameQuestions = ({ initialQ }) => {
  return (
    <>
      <h4>Question:</h4>
      <div className="input-box">
        <textarea readOnly id="code-inp" value={initialQ}></textarea>
      </div>
    </>
  );
};

export default GameQuestions;
