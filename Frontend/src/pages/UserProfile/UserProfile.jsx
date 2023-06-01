import "./userprofile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import{useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import Button from '@mui/material/Button'
import EditIcon from "@mui/icons-material/Edit";
import{PersonAdd, PersonRemoveOutlined} from '@mui/icons-material'
import axios from "axios";
const UserProfile = () => {
  const[isFriend, setIsFriend] = useState(true)
	const{userId} = useParams()
	const[user, setUser] = useState([])
  const[friendsCount, setFriendsCount] = useState('')
	const[post, setPost] = useState([])
	const[noOfPost, setNoOfPost] = useState('')
 useEffect(()=>{
	axios.get(`http://localhost:5000/api/v1/auth/me/${userId}`).then((res)=>{

		setUser(res.data.data);
    console.log("hello",res.data.data)
    setFriendsCount(res.data.data.friends)
		axios.get(`http://localhost:5000/api/v1/posts/${userId}`).then((res)=>{
			setPost(res.data.data);
			setNoOfPost(res.data.data)
		})
	})
 },[])

 const addFriend = () =>{
	const myId = sessionStorage.getItem('userId');
	axios.post(`http://localhost:5000/api/v1/request`,{userId,myId}).then((res)=>{
		console.log(res)
	}).catch((err)=>{
		console.log(err)
	})
 }
const unFriend = (userId) =>{
  const myId = sessionStorage.getItem('userId')
  console.log("Dhanush", myId)
  console.log('tkr',userId)
  axios.delete(`http://localhost:5000/api/v1/request/unfriend/${myId}/${userId}`)

}
  return (
    <>
      <Topbar></Topbar>
      <div className="profile">
        <Sidebar></Sidebar>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="../assets/posts/3.jpg"
                alt=""
              ></img>
              <div className="profile">
                <img
                  className="profileUserImg"
                  src="/assets/person/1.jpg"
                  alt=""
                ></img>
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">Hello My friends!</span>
              <div className="profile-stat">
                <div>
                    <span class="profile-stat-count"><strong>{noOfPost.length}</strong>posts</span>
                  </div>
                  <div>
                    <span class="profile-stat-count"><strong>{friendsCount.length}</strong>friends</span>
                  </div>
              
              </div>
			  <div className="addFriend-btn">
				<Button variant="contained" onClick={()=>addFriend()}><PersonAdd></PersonAdd> Add friend</Button>
         <Button variant="outlined" onClick={()=>{unFriend(user._id)}}><PersonRemoveOutlined></PersonRemoveOutlined>Un friend</Button>
			  </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userPost={post}></Feed>
            <Rightbar></Rightbar>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
