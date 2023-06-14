import { useEffect, useRef, useState } from "react";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/Message/Message";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import "./messenger.css";
import {io} from "socket.io-client"

const Messenger = () => {
  
  const[myFriends, setMyfriends] = useState([])
  const[currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const[newMessage, setnewMessage] = useState("")
  const[arrivalMessage, setArrivalMessage] = useState(null)
  const myId = sessionStorage.getItem("userId")
  const [refresh,setRefresh] = useState(false)
  const scrollRef = useRef()
  const socket = useRef()

  useEffect(()=>{
    socket.current=io("ws://localhost:8900")
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  },[])

  useEffect(()=>{
    arrivalMessage&&currentChat?.members.includes(arrivalMessage.sender)&&setMessages(prev=>[...prev,arrivalMessage])
  },[arrivalMessage,currentChat])

  useEffect(()=>{
    const myId = sessionStorage.getItem('userId')
    socket.current.emit("addUser",myId)
    socket.current.on("getUsers",users=>{
      console.log("online",users)
    })
  },[])

// get friends and save it in my friends
  useEffect(()=>{
    const myId = sessionStorage.getItem("userId")
    axios.get(`http://localhost:5000/api/v1/getfriends/${myId}`).then((res)=>{
      console.log("my friends",res.data.data)
      setMyfriends(res.data.data)
    })
  },[])

   useEffect(()=>{
    const getMessages = async () =>{
      try{
        const res = await axios.get(`http://localhost:5000/api/v1/messages/${currentChat._id}`)
       
        setMessages(res.data.messages)
      }
     catch(err){
      console.log(err)
     }
    }
    getMessages()
   },[currentChat,refresh])

   console.log("show me my messages",messages)

   const handleSubmit = async (e)=>{
    e.preventDefault();
    const message = {
      sender:myId,
      text:newMessage,
      conversationId: currentChat._id
    }
const receiverId = currentChat.members.find(member=> member!==myId)
    socket.current.emit("sendMessage",{
      senderId: myId,
      receiverId,
      text:newMessage
    })
    try{
      const res = await axios.post("http://localhost:5000/api/v1/messages",message)
    
      setMessages([...messages,res.data])
      setnewMessage("")
      setRefresh((prevState)=>!prevState)
    }
    catch(err){
      console.log(err)
    }
   }

   useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior:"smooth"})
   },[messages])
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
            <Conversation myFriends={myFriends}  setCurrentChat={setCurrentChat}></Conversation>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
              {
                currentChat?
              
                <>
            <div className="chatBoxTop">
                {messages.map((message)=>(
                  <div ref ={scrollRef}>
                  <Message message = {message} own={message.sender===myId}></Message>
                  </div>
                ))}
			
            </div>
          
            <div className="divchatBoxBottom">
			<input className="chatMessageInput" placeholder="write something..." value={newMessage} onChange={(e)=>{setnewMessage(e.target.value)}}></input>
			<button className="chatSubmitButton" onClick={handleSubmit}>send</button>
			</div>
      </>:<span className="noConversationText">Open a conversation to start a chat</span>
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
			<ChatOnline></ChatOnline>
		  </div>
        </div>
      </div>
    </>
  );
};
export default Messenger;
