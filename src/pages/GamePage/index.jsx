import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts';

import { Link } from 'react-router-dom';
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
  Video
} from '../../components';
import spinner from './assets/ring-resize.svg';
import './index.css';

const GamePage = () => {
  const { state } = useLocation();
  const { socket } = useAuth();
  const navigateTo = useNavigate();

  const [fontSize, setFontSize] = useState(20);
  const [userTheme, setUserTheme] = useState('vs-dark');
  const [userCode, setUserCode] = useState('');
  const [userLang, setUserLang] = useState('py');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingRun, setLoadingRun] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [allRooms, setAllRooms] = useState();
  const [showPlayerVsPlayer, setShowPlayerVsPlayer] = useState(true);
  const [roomUsers2, setRoomUsers2] = useState();
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userOutput, setUserOutput] = useState('');
  const [winnerId, setWinnerId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [opponentId, setOpponentId] = useState(0);
  const [initialQ, setIntialQ] = useState('');
  const [testCase, setTestCase] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [problem_id, setProblemId] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [popupHidden, setPopupHidden] = useState(true);
  const [autoClose, setAutoClose] = useState(true);

  const access_token = localStorage.getItem('access_token');

  const handleReceiveRooms2 = (data) => {
    const roomsData = data;
    const roomUsers = roomsData[state.room]?.users;
    const roomData = roomUsers ? roomUsers.length : 0;
    setRoomUsers2(roomUsers);
    if (roomData === 2 && loading) {
      console.log('Setting loading to false');
      setLoading(false);
      setAllRooms(data);
    }
  };

  useEffect(() => {
    let id = localStorage.getItem('user_id');
    setUserId(id);

    let r = state?.roomData;
    state?.isSolo ? setLoading(false) : setLoading(true);
    state.isSolo ? setShowPlayerVsPlayer(false) : setShowPlayerVsPlayer(true);

    socket.emit('sendRooms', { r });
    socket.on('receiveRooms2', handleReceiveRooms2);

    axios
      .get(`https://codemaze-api.onrender.com/problems/random`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((res) => {
        setProblemId(res.data.id);
        setIntialQ(res.data.description);
        setTestCase(res.data.examples[0].test_case);
        setExpectedOutcome(res.data.examples[0].output);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    if (state) {
      setRoom(state.room);
      setUsername(state.username);
    }
    if (initialQ || testCase || expectedOutcome) {
      socket.emit('setting_question', { initialQ, testCase, expectedOutcome });
      socket.emit('getting_question');
      socket.on('got_question', (data) => {
        setIntialQ(data.question);
        setTestCase(data.testcases);
        setExpectedOutcome(data.expected);
      });
    }
  }, [
    state.room,
    state.username,
    handleReceiveRooms2,
    initialQ,
    testCase,
    expectedOutcome
  ]);

  useEffect(() => {
    const tests = [
      { py: [`print(${testCase})`] },
      { js: [`console.log(${testCase})`] }
    ];

    if (userLang === 'py') {
      setTestCases(tests[0].py);
    } else {
      setTestCases(tests[1].js);
    }
  }, [userLang, testCase]);

  useEffect(() => {
    const check_UserOutput_TO_expectedOutput = (user, expected) => {
      console.log('User output: ', user);
      console.log('Expected output: ', expected);

      console.log('user : ', userId);
      console.log('opponent : ', opponentId);

      if (user.toLowerCase().trim() === expected.toLowerCase().trim()) {
        console.log('Outputs match!');
        let id = localStorage.getItem('user_id');
        setWinnerId(id);
        socket.emit('set_winner', userId);

        setCorrectAnswer(true);
        setAutoClose(false);
      } else {
        console.log("Outputs don't match!");
        setCorrectAnswer(false);
        setAutoClose(true);
      }
    };

    console.log('!!!!!!!!! Getting 2nd ID !!!!!!');
    socket.emit('set_opponent', userId);
    check_UserOutput_TO_expectedOutput(userOutput, expectedOutcome);
  }, [userOutput]);

  useEffect(() => {
    const sendCheckResponse = (response) => {
      console.log('Answer was correct: ', response);
      socket.emit('check_answer', response); //////
    };
    sendCheckResponse(correctAnswer);
  }, [correctAnswer]);

  const API_URL = 'https://codex-api.fly.dev/';
  const handleCompile = (action) => {
    if (action === 'Run') {
      setLoadingRun(true);
    } else if (action === 'Submit') {
      setLoadingSubmit(true);
      socket.emit('button_press', { room });
      setButtonDisabled(true);
      setButtonPressed(true);
    }
    axios
      .post(`${API_URL}`, {
        code: userCode,
        language: userLang,
        input: userInput,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .catch((error) => {
        console.error(`${action} error:`, error);
        setUserOutput(
          `Error occurred during ${action.toLowerCase()}. Please check your code.`
        );
      })
      .finally(() => {
        if (action === 'Run') {
          setLoadingRun(false);
        } else if (action === 'Submit') {
          setLoadingSubmit(false);
          setPopupHidden(false);
          socket.emit('display_popup', { room });
        }
      });
  };

  const handleClosePopup = () => {
    setButtonDisabled(false);
    setButtonPressed(false);
    setPopupHidden(true);
    setCorrectAnswer(null);
    setUserOutput('');
    setUserInput('');
    socket.emit('button_enable', { room });
    socket.emit('hide_popup', { room });
  };

  const gameFinish = async (e) => {
    e.preventDefault();
    console.log('problem : ', problem_id);
    console.log('user : ', userId);
    console.log('opponent : ', opponentId);
    console.log('winner : ', winnerId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        problem_id: problem_id,
        user_one_id: userId,
        user_two_id: opponentId,
        winner_id: winnerId
      })
    };
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(
      'https://codemaze-api.onrender.com/sessions',
      options
    );

    if (response.status === 201) {
      handleCancel();
      navigateTo('/profile');
    }
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
      setCorrectAnswer(data);
    };

    const opponentIdListener = (data) => {
      console.log(data); // should be the other id in user_ids
      setOpponentId(data);
    };
    const winnerIdListener = (data) => {
      setWinnerId(data);
    };

    socket.on('button_pressed', buttonPressedListener);
    socket.on('button_enabled', buttonEnabledListener);
    socket.on('displayed_popup', popupDisplayListener);
    socket.on('hidden_popup', popupHideListener);

    socket.on('checked_answer', answerStateListener);

    socket.on('opponent_set', opponentIdListener);
    socket.on('winner_set', winnerIdListener);

    return () => {
      socket.off('button_pressed', buttonPressedListener);
      socket.off('button_enabled', buttonEnabledListener);
      socket.off('displayed_popup', popupDisplayListener);
      socket.off('hidden_popup', popupHideListener);

      socket.off('checked_answer', answerStateListener);

      socket.off('opponent_set', opponentIdListener);
      socket.off('winner_set', winnerIdListener);
    };
  }, []);

  const isLoggedIn = localStorage.getItem('access_token');

  const options = {
    fontSize: fontSize
  };

  const handlePlayerVsPlayerTimeout = () => {
    setShowPlayerVsPlayer(false);
  };

  const clearOutput = () => {
    setUserOutput('');
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
        <div className='message22'>
          <h1>Login to Access Game</h1>
          <Link to='/login'>
            <button id='loginBtn'>Login</button>
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
        <div className='App'>
          <GameNavbar
            userLang={userLang}
            setUserLang={setUserLang}
            userTheme={userTheme}
            setUserTheme={setUserTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            socket={socket}
          />
          <div className='main'>
            <div className='left-container'>
              <Editor
                data-testid='monaco-editor'
                options={options}
                width='auto'
                theme={userTheme}
                language={userLang}
                defaultLanguage='python'
                defaultValue='# Enter your code here'
                onChange={(value) => {
                  setUserCode(value + '\n' + testCases.join('\n'));
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
            <div className='right-container'>
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
                  onClose={handleClosePopup}
                  autoClose={autoClose}
                  gameFinish={gameFinish}
                  handleCancel={handleCancel}
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
