import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"
const Conversation = ({myFriends, setCurrentChat}) =>{
	const [user, setUser] = useState(null)
	const [conversation, setConversation] = useState()
	const defaultPic = 'assets/person/default-avatar.jpg'
	const myId = sessionStorage.getItem("userId")

	useEffect(()=>{
		
		axios.get(`http://localhost:5000/api/v1/conversation/${myId}`).then((res)=>{
			console.log(res)
		})
	},[])
	const conversationRoom = (currentId,userId )=>{
			console.log("myId", currentId)
			console.log("friendId",userId)
			axios.post(`http://localhost:5000/api/v1/conversation`,{senderId:currentId,receiverId:userId}).then((res)=>{
				console.log(res.data.data)
				setConversation(res.data.data)
				setCurrentChat(conversation)
			
			})
	}

	return(
		<>
		{myFriends.map((friend)=>(
				<div className="conversation" onClick={()=>{conversationRoom(myId, friend._id)}}>
		  
				<>
				  <img className="conversationImg" src="assets/person/1.jpg" alt="profile" />
				  <span className="conversationName">{friend.name}</span>
				</>
			
				</div>
		))}
		</>
	
	)
}
export default Conversation



// import { useEffect, useState } from "react"
// import "./conversation.css"
// import axios from "axios"
// const Conversation = ({conversation, myId}) =>{
// 	const [user, setUser] = useState(null)
// 	const defaultPic = 'assets/person/default-avatar.jpg'
// 	useEffect(()=>{
// 		const friendId = conversation.members.find((member)=>member !== myId)
// 		const getUser =async () =>{
// 			try{
// 			const res = await axios(`http://localhost:5000/api/v1/auth/me/${friendId}`)
// 			setUser(res.data.data)
// 		}
// 		catch(err){
// 			console.log(err)
// 		}
// 		}
// 		getUser()
// 	},[conversation,myId])
// 	return(
// 		<div className="conversation">
// 		  {user && (
//         <>
//           <img className="conversationImg" src={user.profilepic === "no-photo.jpg" ? defaultPic : user.profilepic} alt="profile" />
//           <span className="conversationName">{user.name}</span>
//         </>
//       )}
// 		</div>
// 	)
// }
// export default Conversation