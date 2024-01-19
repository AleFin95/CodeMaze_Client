const GameSubmitButton = ({ handleCompile, loadingSubmit, disabled }) => {
  return (
    <>
      <button
        className="sub-btn"
        onClick={() => handleCompile("Submit")}
        disabled={ disabled || loadingSubmit}
      >
        {loadingSubmit ? "Compiling..." : "Submit"}
      </button>
    </>
  );
};

export default GameSubmitButton;
