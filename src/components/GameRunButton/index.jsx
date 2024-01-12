const GameRunButton = ({ handleCompile, loadingRun }) => {
  return (
    <button
      className="run-btn"
      onClick={() => handleCompile("Run")}
      disabled={loadingRun}
    >
      {loadingRun ? "Compiling..." : "Run"}
    </button>
  );
};

export default GameRunButton;
