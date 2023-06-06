import { useEffect, useState } from "react";
import ChatOnline from "../../components/ChatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/Message/Message";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import "./messenger.css";
const Messenger = () => {
  const[myFriends, setMyFriends] = useState([])
  useEffect(()=>{
    const myId = sessionStorage.getItem("userId")
    axios.get(`http://localhost:5000/api/v1/getfriends/${myId}`).then((res)=>{
      console.log(res.data.data)
      setMyFriends(res.data.data)
    })
  },[])
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
            {myFriends.map((friend)=>(<Conversation profilepic={friend.profilepic} name = {friend.name} userId = {friend._id}></Conversation>))}
            
            {/* <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation>
            <Conversation></Conversation> */}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own={true}></Message>
              <Message></Message>
              <Message own={true}></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
			  <Message></Message>
            </div>
            <div className="chatBoxBottom">
			<textarea className="chatMessageInput" placeholder="write something..."></textarea>
			<button className="chatSubmitButton">send</button>
			</div>
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
