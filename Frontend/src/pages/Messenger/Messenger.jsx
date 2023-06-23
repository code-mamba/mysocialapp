import { useEffect, useRef, useState } from "react";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/Message/Message";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import "./messenger.css";
import { io } from "socket.io-client";

const Messenger = () => {
  const [myFriends, setMyfriends] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const myId = sessionStorage.getItem("userId");
  const [refresh, setRefresh] = useState(false);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    // this part of code is waiting for the message whenever the both user sends the message
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  /**this useEffect hook adds the arrivalMessage to the messages state only if it satisfies
   * the condition of being a relevant message for the current chat. */

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // this useEffect to store my id when i comes to online so it will emit my id to the socket server.
  useEffect(() => {
    const myId = sessionStorage.getItem("userId");
    socket.current.emit("addUser", myId);
    socket.current.on("getUsers", (users) => {
      console.log("online", users);
    });
  }, []);

  // 1. get friends and save it in my friends
  useEffect(() => {
    const myId = sessionStorage.getItem("userId");
    axios.get(`http://localhost:5000/api/v1/getfriends/${myId}`).then((res) => {
      console.log("my friends", res.data.data);
      setMyfriends(res.data.data);
    });
  }, []);

  // 2. this use effect is to fetch all message from particular chat and set it in message state
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/messages/${currentChat._id}`
        );

        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, refresh]);

  /** when a user click the submit button the current user's id, text, conversation id is stored in the object called message that object should be store in messages collection
   *  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: myId,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((member) => member !== myId);
    socket.current.emit("sendMessage", {
      senderId: myId,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/messages",
        message
      );

      setMessages([...messages, res.data]);
      setnewMessage("");
      setRefresh((prevState) => !prevState);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Topbar></Topbar>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for friends"
              className="chatMenuInput"
            ></input>
            <Conversation
              myFriends={myFriends}
              setCurrentChat={setCurrentChat}
            ></Conversation>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === myId}
                      ></Message>
                    </div>
                  ))}
                </div>

                <div className="divchatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="write something..."
                    value={newMessage}
                    onChange={(e) => {
                      setnewMessage(e.target.value);
                    }}
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Messenger;
