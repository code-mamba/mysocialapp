import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"
const Conversation = ({conversation, myId}) =>{
	const [user, setUser] = useState(null)
	const defaultPic = 'assets/person/default-avatar.jpg'
	useEffect(()=>{
		const friendId = conversation.members.find((member)=>member !== myId)
		const getUser =async () =>{
			try{
			const res = await axios(`http://localhost:5000/api/v1/auth/me/${friendId}`)
			console.log(res.data.data)
			setUser(res.data.data)
		}
		catch(err){
			console.log(err)
		}
		}
		getUser()
	},[conversation,myId])
	return(
		<div className="conversation">
		  {user && (
        <>
          <img className="conversationImg" src={user.profilepic === "no-photo.jpg" ? defaultPic : user.profilepic} alt="profile" />
          <span className="conversationName">{user.name}</span>
        </>
      )}
		</div>
	)
}
export default Conversation