const GameSubmitButton = ({ handleCompile, loadingSubmit }) => {
  return (
    <>
      <button
        className="sub-btn"
        onClick={() => handleCompile("Submit")}
        disabled={loadingSubmit}
      >
        {loadingSubmit ? "Compiling..." : "Submit"}
      </button>
    </>
  );
};

export default GameSubmitButton;
