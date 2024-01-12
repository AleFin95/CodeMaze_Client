import { useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import spinner from "./assets/ring-resize.svg";
import "./index.css";
import {
  Video,
  GameNavbar,
  GameQuestions,
  GameTestCases,
  GameOutput,
  GameSubmitButton,
  GameRunButton,
} from "../../components";

const GamePage = () => {
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("py");
  const [testCases, setTestCases] = useState([]);
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { state } = useLocation();
  console.log("state: ", state)


  const API_URL = "https://api.codex.jaagrav.in";

  const tests = [
    {
      py: [
        "print(twoSum([2, 7, 11, 15], 9))",
        "print(twoSum([21, 7, 11, 1], 8))",
        "print(twoSum([21, 9, 1, 12], 10))",
      ],
    },
    {
      js: [
        "console.log(twoSum([2, 7, 11, 15], 9))",
        "console.log(twoSum([7, 12, 1, 19], 8))",
        "console.log(twoSum([21, 9, 1, 12], 10))",
      ],
    },
  ];

  useEffect(() => {
    if (userLang === "py") {
      setTestCases(tests[0].py);
    } else {
      setTestCases(tests[1].js);
    }
  }, [userLang]);

  const options = {
    fontSize: fontSize,
  };

  const clearOutput = () => {
    setUserOutput("");
  };

  const handleCompile = (action) => {
    if (action === "Run") {
      setLoadingRun(true);
    } else if (action === "Submit") {
      setLoadingSubmit(true);
    }

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
        console.error(`${action} error:`, error);
        setUserOutput(
          `Error occurred during ${action.toLowerCase()}. Please check your code.`
        );
      })
      .finally(() => {
        if (action === "Run") {
          setLoadingRun(false);
        } else if (action === "Submit") {
          setLoadingSubmit(false);
        }
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
                setUserCode(value + "\n" + testCases.join("\n"));
              }}
            />
            <GameRunButton
              handleCompile={handleCompile}
              loadingRun={loadingRun}
            />
            <GameSubmitButton
              handleCompile={handleCompile}
              loadingSubmit={loadingSubmit}
            />
          </div>
          <div className="right-container">
            <GameQuestions />
            <GameTestCases testCases={testCases} />
            <GameOutput
              spinner={spinner}
              userOutput={userOutput}
              loading={loadingRun || loadingSubmit}
              clearOutput={clearOutput}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
