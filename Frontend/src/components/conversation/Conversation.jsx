import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
const Conversation = ({ myFriends, setCurrentChat }) => {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState();
  const defaultPic = "assets/person/default-avatar.jpg";
  const myId = sessionStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/conversation/${myId}`)
      .then((res) => {
        console.log(res);
      });
  }, []);
  const conversationRoom = (currentId, userId) => {
    axios
      .post(`http://localhost:5000/api/v1/conversation`, {
        senderId: currentId,
        receiverId: userId,
      })
      .then((res) => {
        setConversation(res.data.data);
        setCurrentChat(conversation);
      });
  };

  return (
    <>
      {myFriends.map((friend) => (
        <div
          className="conversation"
          onClick={() => {
            conversationRoom(myId, friend._id);
          }}
        >
          <>
            <img
              className="conversationImg"
              src={
                friend.profilepic === "no-photo.jpg"
                  ? defaultPic
                  : `http://localhost:5000/public/${friend.profilepic}`
              }
              alt="profile"
            />
            <span className="conversationName">{friend.name}</span>
          </>
        </div>
      ))}
    </>
  );
};
export default Conversation;
