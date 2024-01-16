import { useEffect, useState } from "react";
import { Axios } from "axios";

const GameQuestions = ({socket, room, roomData, name, isSolo, initialQ}) => {
  
  const [userRooms, setUserRooms] = useState()
  const [question, setQuestion] = useState(initialQ)
  //replace text initial state with the random question

  const [text, setText] = useState(initialQ)

  // const [text, setText] = useState(
  //   `question number is ${Math.random() * 10}`
  // );

  console.log("question room: ", room)
  console.log("question roomData: ", roomData)
  console.log("qNmae: ", name)
  console.log("isSolo: ", isSolo)
  console.log("Question: ", question)

  useEffect(() => {
    if(!isSolo){
      socket.emit("send_question", {initialQ, room, name})
      
      const handleGetQuestion = (data) => {
        console.log("data: ", data);
        setQuestion(data);
      };
  
      socket.on("get_question", handleGetQuestion);
  
      return () => {
        socket.off("get_question", handleGetQuestion);
      };
    } else if (isSolo){
      setQuestion(initialQ)
    }

  }, [socket, initialQ])




  return (
    <>
      <h4>Question:</h4>
      <div className="input-box">
        <textarea readOnly id="code-inp" value={question}></textarea>
      </div>
    </>
  );
};

export default GameQuestions;
