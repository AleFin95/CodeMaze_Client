import { useState, useEffect, useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts";

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
  MatchingPlayers,
  FeedbackPopUp,
  PlayerVsPlayer,
} from "../../components";
import { Link } from "react-router-dom";

const GamePage = () => {
  const { state } = useLocation();
  const { socket } = useAuth();
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("py");
  const [testCases, setTestCases] = useState([]);
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [allRooms, setAllRooms] = useState();
  const [loading, setLoading] = useState(true);
  const [initialQ, setIntialQ] = useState("");
  const [testCase, setTestCase] = useState("");
  const [showPlayerVsPlayer, setShowPlayerVsPlayer] = useState(true);
  const [roomUsers2, setRoomUsers2] = useState()


  const access_token =localStorage.getItem("access_token")

  console.log("state: ", state);

  const handleReceiveRooms = useCallback(
    (data) => {
      const roomsData = data;
      console.log("roomsData: ", roomsData);

      const roomUsers = roomsData[state.room]?.users;
      const roomData = roomUsers ? roomUsers.length : 0;

      console.log("roomUsers: ", roomUsers);
      console.log("roomData: ", roomData);

      if (roomData === 2 && loading) {
        console.log("Setting loading to false");
        setLoading(false);
      }
    },
    [state.room, loading]
  );

  const handleReceiveRooms2 = (data) => {
    const roomsData = data;
    console.log("roomsData: ", roomsData);

    const roomUsers = roomsData[state.room]?.users;
    const roomData = roomUsers ? roomUsers.length : 0;
    setRoomUsers2(roomUsers)

    console.log("roomUsers: ", roomUsers);

    if (roomData === 2 && loading) {
      console.log("Setting loading to false");
      setLoading(false);
      setAllRooms(data);
    }
  };

  useEffect(() => {
    let r = state.roomData;
    state.isSolo ? setLoading(false) : setLoading(true);
    // socket.on("receiveRooms", handleReceiveRooms)
    socket.emit("sendRooms", { r });
    socket.on("receiveRooms2", handleReceiveRooms2);

    axios
      .get(`https://codemaze-api.onrender.com/problems/random`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res)=>{
        console.log(res)
        setIntialQ(res.data.description)
        setTestCase(res.data.examples[0].test_case)
      })
      .catch(error=> {
          console.error("Error fetching data: ", error)
      })

      
    }, [])
    
    useEffect(() => {
      setRoom(state.room);
      console.log("room ", state.room);
      setUsername(state.username);
      
      if(initialQ || testCase){
        socket.emit("setting_question", {initialQ, testCase})
        socket.emit("getting_question")
        socket.on("got_question", data => {
          console.log("getting_question: ", data)
          setIntialQ(data.question)
          setTestCase(data.testcases)

        })
      }
  }, [state.room, state.username, handleReceiveRooms, initialQ, testCase]);

  const API_URL = "https://codex-api.fly.dev/";
 
  // const tests = [
  //   {
  //     py: [
  //       `print(${testCase})`
  //     ],
  //   },
  //   {
  //     js: [
  //       `console.log(${testCase})`
  //     ],
  //   },
  // ];

  useEffect(() => {
    const tests = [
      {
        py: [
          `print(${testCase})`
        ],
      },
      {
        js: [
          `console.log(${testCase})`
        ],
      },
    ];

    if (userLang === "py") {
      setTestCases(tests[0].py);
    } else {
      setTestCases(tests[1].js);
    }



  }, [userLang, testCase]);

  const options = {
    fontSize: fontSize,
  };

  const clearOutput = () => {
    setUserOutput("");
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [popupHidden, setPopupHidden] = useState(true);

  const handleCancel = () => {
    if (socket && socket.connected){
      socket.disconnect()
    }
  }

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
          }, 2000);
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

    socket.on("button_pressed", buttonPressedListener);
    socket.on("button_enabled", buttonEnabledListener);
    socket.on("displayed_popup", popupDisplayListener);
    socket.on("hidden_popup", popupHideListener);

    return () => {
      socket.off("button_pressed", buttonPressedListener);
      socket.off("button_enabled", buttonEnabledListener);
      socket.off("displayed_popup", popupDisplayListener);
      socket.off("hidden_popup", popupHideListener);
    };
  }, []);

  const isLoggedIn = localStorage.getItem("access_token");

  const handlePlayerVsPlayerTimeout = () => {
    setShowPlayerVsPlayer(false);
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
      ) : showPlayerVsPlayer ? (<PlayerVsPlayer roomUsers2={roomUsers2} onTimeOut={handlePlayerVsPlayerTimeout}/>) : (
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
                <FeedbackPopUp buttonPressed={buttonPressed} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
