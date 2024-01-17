import { Editor } from "@monaco-editor/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

import { Link } from "react-router-dom";
import {
  FeedbackPopUp,
  GameNavbar,
  GameOutput,
  GameQuestions,
  GameRunButton,
  GameSubmitButton,
  GameTestCases,
  MatchingPlayers,
  PlayerVsPlayer,
  Video,
} from "../../components";
import spinner from "./assets/ring-resize.svg";
import "./index.css";

const GamePage = () => {
  const { state } = useLocation();
  const { socket } = useAuth();
  const [fontSize, setFontSize] = useState(20);

  const [userTheme, setUserTheme] = useState("vs-dark");
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("py");
  const [userInput, setUserInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [allRooms, setAllRooms] = useState();

  const [showPlayerVsPlayer, setShowPlayerVsPlayer] = useState(true);
  const [roomUsers2, setRoomUsers2] = useState();

  const access_token = localStorage.getItem("access_token");

  console.log("state: ", state);

  // const handleReceiveRooms = useCallback(
  //   (data) => {
  //     const roomsData = data;
  //     // console.log("roomsData: ", roomsData);

  //     const roomUsers = roomsData[state.room]?.users;
  //     const roomData = roomUsers ? roomUsers.length : 0;

  //     // console.log("roomUsers: ", roomUsers);
  //     // console.log("roomData: ", roomData);

  //     if (roomData === 2 && loading) {
  //       console.log("Setting loading to false");
  //       setLoading(false);
  //     }
  //   },
  //   [state.room, loading]
  // );

  const handleReceiveRooms2 = (data) => {
    const roomsData = data;
    // console.log("roomsData: ", roomsData);

    const roomUsers = roomsData[state.room]?.users;
    const roomData = roomUsers ? roomUsers.length : 0;
    setRoomUsers2(roomUsers);

    // console.log("roomUsers: ", roomUsers);

    if (roomData === 2 && loading) {
      console.log("Setting loading to false");
      setLoading(false);
      setAllRooms(data);
    }
  };

  const [initialQ, setIntialQ] = useState("");
  const [testCase, setTestCase] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [expectedOutcome, setExpectedOutcome] = useState("");

  useEffect(() => {
    let r = state?.roomData; // Use optional chaining to handle null or undefined
    state?.isSolo ? setLoading(false) : setLoading(true);
    state?.isSolo ? setShowPlayerVsPlayer(false) : setShowPlayerVsPlayer(true);

    // socket.on("receiveRooms", handleReceiveRooms)
    socket.emit("sendRooms", { r });
    socket.on("receiveRooms2", handleReceiveRooms2);

    axios
      .get(`https://codemaze-api.onrender.com/problems/random`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIntialQ(res.data.description);
        setTestCase(res.data.examples[0].test_case);
        setExpectedOutcome(res.data.examples[0].output);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (state) {
      setRoom(state.room);
      console.log("room ", state.room);
      setUsername(state.username);
    }
    if ((initialQ || testCase || expectedOutcome, expectedOutcome)) {
      socket.emit("setting_question", { initialQ, testCase });
      socket.emit("getting_question");
      socket.on("got_question", (data) => {
        console.log("getting_question: ", data);
        setIntialQ(data.question);
        setTestCase(data.testcases);
        setExpectedOutcome(data.expected);
      });
    }
  }, [
    state?.room,
    state?.username,
    handleReceiveRooms2,
    initialQ,
    testCase,
    expectedOutcome,
  ]);

  useEffect(() => {
    const tests = [
      { py: [`print(${testCase})`] },
      { js: [`console.log(${testCase})`] },
    ];

    if (userLang === "py") {
      setTestCases(tests[0].py);
    } else {
      setTestCases(tests[1].js);
    }
  }, [userLang, testCase]);

  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userOutput, setUserOutput] = useState("");

  useEffect(() => {
    const check_UserOutput_TO_expectedOutput = (user, expected) => {
      console.log("User output: ", user);
      console.log("Expected output: ", expected);

      if (user.toLowerCase().trim() === expected.toLowerCase().trim()) {
        console.log("Outputs match!");
        setCorrectAnswer(true);
      } else {
        console.log("Outputs don't match!");
        setCorrectAnswer(false);
      }
    };

    check_UserOutput_TO_expectedOutput(userOutput, expectedOutcome);
  }, [userOutput]);

  useEffect(() => {
    const sendCheckResponse = (response) => {
      console.log("Answer was correct: ", response);
      socket.emit("check_answer", response); //////
    };

    sendCheckResponse(correctAnswer);
  }, [correctAnswer]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [popupHidden, setPopupHidden] = useState(true);

  const API_URL = "https://codex-api.fly.dev/";
  const handleCompile = (action) => {
    if (action === "Run") {
      setLoadingRun(true);
    } else if (action === "Submit") {
      setLoadingSubmit(true);
      socket.emit("button_press", { room });
      setButtonDisabled(true);
      setButtonPressed(true);
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
          setPopupHidden(false);
          socket.emit("display_popup", { room });

          setTimeout(() => {
            setButtonDisabled(false);
            setPopupHidden(true);
            setButtonPressed(false);
            socket.emit("button_enable", { room });
            socket.emit("hide_popup", { room });
          }, 3000);
        }
      });
  };

  useEffect(() => {
    const buttonPressedListener = () => {
      setButtonDisabled(true);
    };
    const buttonEnabledListener = () => {
      setButtonDisabled(false);
    };
    const popupDisplayListener = () => {
      setPopupHidden(false);
    };
    const popupHideListener = () => {
      setPopupHidden(true);
    };

    const answerStateListener = (data) => {
      console.log("THIS IS WHERE YOU WANT TO LOOK");
      console.log(data);
      setCorrectAnswer(data);
    };

    socket.on("button_pressed", buttonPressedListener);
    socket.on("button_enabled", buttonEnabledListener);
    socket.on("displayed_popup", popupDisplayListener);
    socket.on("hidden_popup", popupHideListener);

    socket.on("checked_answer", answerStateListener);

    return () => {
      socket.off("button_pressed", buttonPressedListener);
      socket.off("button_enabled", buttonEnabledListener);
      socket.off("displayed_popup", popupDisplayListener);
      socket.off("hidden_popup", popupHideListener);

      socket.off("checked_answer", answerStateListener);
    };
  }, []);

  const isLoggedIn = localStorage.getItem("access_token");
  const options = {
    fontSize: fontSize,
  };

  const handlePlayerVsPlayerTimeout = () => {
    setShowPlayerVsPlayer(false);
  };

  const clearOutput = () => {
    setUserOutput("");
  };

  const handleCancel = () => {
    if (socket && socket.connected) {
      socket.disconnect();
    }
  };

  return (
    <>
      <Video />
      {isLoggedIn === null ? (
        <div className="message22">
          <h1>Login to Access Game</h1>
          <Link to="/login">
            <button id="loginBtn">Login</button>
          </Link>
          {/* Additional content for non-logged-in users */}
        </div>
      ) : loading ? (
        <MatchingPlayers handleCancel={handleCancel} />
      ) : showPlayerVsPlayer ? (
        <PlayerVsPlayer
          roomUsers2={roomUsers2}
          onTimeOut={handlePlayerVsPlayerTimeout}
        />
      ) : (
        <div className="App">
          <GameNavbar
            userLang={userLang}
            setUserLang={setUserLang}
            userTheme={userTheme}
            setUserTheme={setUserTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            socket={socket}
          />
          <div className="main">
            <div className="left-container">
              <Editor
                data-testid="monaco-editor"
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
                disabled={buttonDisabled}
              />
            </div>
            <div className="right-container">
              <GameQuestions
                socket={socket}
                room={state.room}
                roomData={state.roomData}
                name={state.username}
                isSolo={state.isSolo}
                initialQ={initialQ}
              />
              <GameTestCases testCases={testCases} />
              {popupHidden ? (
                <GameOutput
                  spinner={spinner}
                  userOutput={userOutput}
                  loading={loadingRun || loadingSubmit}
                  clearOutput={clearOutput}
                />
              ) : (
                <FeedbackPopUp
                  buttonPressed={buttonPressed}
                  correctAnswer={correctAnswer}
                  expectedOutcome={expectedOutcome}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
