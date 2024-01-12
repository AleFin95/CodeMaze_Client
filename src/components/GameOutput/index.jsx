const GameOutput = ({ userOutput, spinner, loading, clearOutput }) => {
  return (
    <>
      <h4>Output:</h4>
      {loading ? (
        <div className="spinner-box">
          <img src={spinner} alt="Loading..." />
        </div>
      ) : (
        <div className="output-box">
          <pre>{userOutput}</pre>
          <button onClick={clearOutput} className="clear-btn">
            Clear
          </button>
        </div>
      )}
    </>
  );
};

export default GameOutput;
