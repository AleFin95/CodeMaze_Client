import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import axios from "axios";
import spinner from "./assets/ring-resize.svg";
import Navbar from "./Navbar";
import "./index.css";
import { Video } from "../../components";

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
  console.log(userInput);
  console.log(userCode);

  return (
    <>
      <Video />
      <div className="App">
        <Navbar
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
            <h4>Question:</h4>
            <div className="input-box">
              <textarea
                id="code-inp"
                onChange={(e) => setUserInput(e.target.value)}
              >
                Given an array of integers nums and an integer target, return
                indices of the two numbers such that they add up to target. You
                may assume that each input would have exactly one solution, and
                you may not use the same element twice. You can return the
                answer in any order. Example 1: Input: nums = [2,7,11,15],
                target = 9 Output: [0,1] Explanation: Because nums[0] + nums[1]
                == 9, we return [0, 1]. There are n children standing in a line.
                Each child is assigned a rating value given in the integer array
                ratings. You are giving candies to these children subjected to
                the following requirements: Each child must have at least one
                candy. Children with a higher rating get more candies than their
                neighbors. Return the minimum number of candies you need to have
                to distribute the candies to the children.
              </textarea>
            </div>
            <h4>Test Case:</h4>
            <div className="input-box">
              <pre id="code-inp" style={{ border: "1px solid" }}>
                {`
print(twoSum([2, 7, 11, 15], 9))
print(twoSum([21, 7, 11, 1], 8))
print(twoSum([21, 9, 1, 12], 10))
    `}
              </pre>
            </div>
            <h4>Output:</h4>
            {loading ? (
              <div className="spinner-box">
                <img src={spinner} alt="Loading..." />
              </div>
            ) : (
              <div className="output-box">
                <pre>{userOutput}</pre>
                <button
                  onClick={() => {
                    clearOutput();
                  }}
                  className="clear-btn"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
