import Split from "react-split";
import GamePage from "../GamePage";

const TestPage3 = () => {
  return (
    <>
      <Split sizes={[50, 50]} direction="vertical">
        <GamePage />
        <GamePage />
      </Split>
    </>
  );
};

export default TestPage3;
