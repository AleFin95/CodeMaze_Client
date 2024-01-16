import Split from "react-split";
import GamePage from "../GamePage";
import { AuthProvider } from "../../contexts";

const TestPage3 = () => {
  return (
    <>
      <AuthProvider>
        <Split sizes={[50, 50]} direction="vertical">
          <GamePage />
          <GamePage />
        </Split>
      </AuthProvider>
    </>
  );
};

export default TestPage3;
