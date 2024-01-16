import { useEffect, useState } from "react";

const GameQuestions = ({socket, room, roomData, name}) => {
  
  const [userRooms, setUserRooms] = useState()
  const [question, setQuestion] = useState("")
  const [text, setText] = useState("");

  console.log("question room: ", room)
  console.log("question roomData: ", roomData)
  console.log("qNmae: ", name)

  useEffect(() => {
    socket.emit("send_question", {text, room, name})
    
    const handleGetQuestion = (data) => {
      console.log("data: ", data);
      setQuestion(data);
    };

    socket.on("get_question", handleGetQuestion);

    return () => {
      socket.off("get_question", handleGetQuestion);
    };

  }, [socket])




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
