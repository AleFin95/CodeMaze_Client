const GameTestCases = ({ testCases }) => {
  return (
    <>
      <h4>Test Cases:</h4>
      <div className="input-box">
        <div id="code-inp">
          <ul>
            {testCases.map((testCase, index) => (
              <li key={index}>{testCase}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GameTestCases;
