import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./tagFriends.css";
const TagFriends = ({isTagFriendsOpen, setIsTagFriendsOpen,caption,setCaption}) =>{
	const[friends,setFriends] = useState([])
	const defaultPic = "/assets/person/default-avatar.jpg"
	useEffect(()=>{
		const myId = sessionStorage.getItem("userId")
		axios.get(`http://localhost:5000/api/v1/getfriends/${myId}`).then((res)=>{console.log(res.data.data);
	setFriends(res.data.data)})
	},[])

	const tagged = (name) =>{
		console.log(name)
		setCaption(`${caption} #${name}`)

	}

	return(
		<>
      <Dialog className="alertBox" open={isTagFriendsOpen} onClose={() => setIsTagFriendsOpen(false)}>
        <DialogTitle className="alertTitle">Tag your friends</DialogTitle>
        <DialogContent className="alertContent">
          <div className="friendsList">
            {friends &&
              friends.map((friend) => (
                <div key={friend.id} className="friendItem" onClick={()=>tagged(friend.name)}>
                  <img
                    className="profileImg"
                    src={friend.profilepic === "no-photo.jpg" ? defaultPic : `http://localhost:5000/public/${friend.profilepic}`}
                    alt=""
                  />
                  <p className="friendName">{friend.name}</p>
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
		</>
	)
}
export default TagFriends