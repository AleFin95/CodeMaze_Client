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
} from "../../components";
import { Link } from "react-router-dom";

const GamePage = () => {
  const { state } = useLocation();
  const { socket } = useAuth()
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("py");
  const [testCases, setTestCases] = useState([]);
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [room, setRoom] = useState("")
  const [username, setUsername] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [loading, setLoading] = useState(true);

  console.log("state: ", state)

  const handleReceiveRooms = useCallback(
    (data) => {
      const roomsData = data;
      console.log("roomsData: ", roomsData);
  
      const roomUsers = roomsData[state.room]?.users;
      const roomData = roomUsers ? roomUsers.length : 0;
  
      console.log("roomUsers: ", roomUsers);
      
      if (roomData === 2 && loading) {
        console.log("Setting loading to false");
        setLoading(false);
      }
    }, 
    [state.room, loading]
  );
  
  useEffect(() => {
    state.isSolo ? setLoading(false) : setLoading(true)
    socket.on("receiveRooms", handleReceiveRooms)
  }, [])
  
  useEffect(() => {
    setRoom(state.room);
    console.log("room ", state.room);
    setUsername(state.username);

    console.log("test")


    socket.on("receiveRooms", data => {
      console.log("test2")
    });

    console.log("test3")

    return () => {
      socket.off("receiveRooms", handleReceiveRooms);
    };
  }, [state.room, state.username, handleReceiveRooms]);

  
  

  // useEffect(() => {
  //   setRoom(state.room)
  //   console.log("room ", state.room)
  //   setUsername(state.username)
  //   // socket.connect()

  //   // socket.on("receivemoredata", data => {
  //   //   console.log("user_rooms: ", data)
  //   // })

  //   socket.on("receiveRooms", data => {
  //     const roomsData = data;
  //     console.log("roomsData: ", roomsData)
  //     const roomData = roomsData[state.room]["users"].length
  //     if(roomData === 2){
  //       console.log("loading :", loading)
  //       setLoading(false)
  //     }
  //   })

  // }, [])



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
  
  useEffect(() => {
    // This effect will run on every render
    // and trigger a state update, causing an infinite loop
      if(localStorage.getItem("mode") === "true"){
    setLoading(true)
  }
  }, [loading]);

  const isLoggedIn = localStorage.getItem("access_token");

  return (
   <>
   <Video />
   { isLoggedIn === null ? (
   <div className="message22">
    <h1>Login to Access Game</h1>
    <Link to="/login"><button id="loginBtn">Login</button></Link>
   {/* Additional content for non-logged-in users */}
 </div>) : (
     loading  ? <MatchingPlayers/> :(
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
      )) } 
    

    </>
  );
};

export default GamePage;
