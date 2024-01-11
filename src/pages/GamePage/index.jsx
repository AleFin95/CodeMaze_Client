import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import spinner from "./assets/ring-resize.svg";
import "./index.css";
import {
  Video,
  GameNavbar,
  GameQuestions,
  GameTestCase,
  GameOutput,
} from "../../components";

const API_URL = "https://api.codex.jaagrav.in";

const GamePage = () => {
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("py");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  const clearOutput = () => {
    setUserOutput("");
  };

  const handleCompile = () => {
    setLoading(true);
    setUserOutput("");

    axios
      .post(`${API_URL}`, {
        code: userCode,
        language: userLang,
        input: userInput,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setUserOutput(res.data.output);
        console.log(JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error("Compilation error:", error);
        setUserOutput(
          "Error occurred during compilation. Please check your code."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Video />
      <div className="App">
        <GameNavbar
          userLang={userLang}
          setUserLang={setUserLang}
          userTheme={userTheme}
          setUserTheme={setUserTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
        <div className="main">
          <div className="left-container">
            <Editor
              options={options}
              width="auto"
              theme={userTheme}
              language={userLang}
              defaultLanguage="python"
              defaultValue="# Enter your code here"
              onChange={(value) => {
                setUserCode(value);
              }}
            />
            <button
              className="run-btn"
              onClick={handleCompile}
              disabled={loading}
            >
              {loading ? "Compiling..." : "Run"}
            </button>
          </div>
          <div className="right-container">
            <GameQuestions />
            <GameTestCase />
            <GameOutput
              spinner={spinner}
              userOutput={userOutput}
              loading={loading}
              clearOutput={clearOutput}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
