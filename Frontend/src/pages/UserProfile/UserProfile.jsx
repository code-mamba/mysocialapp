import "./userprofile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { PersonAdd, PersonRemoveOutlined } from "@mui/icons-material";
import FriendsForm from "../FriendsForm/FriendsForm";
import axios from "axios";
const UserProfile = () => {
  const [isFriendFormActive,setIsFriendFormActive] = useState(false)
  const [isFriend, setIsFriend] = useState(false);
  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [friendsCount, setFriendsCount] = useState("");
  const [post, setPost] = useState([]);
  const [noOfPost, setNoOfPost] = useState("");
  const defaultPic = "assets/person/default-avatar.jpg";


   useEffect(()=>{
    const myId = sessionStorage.getItem("userId")
  	axios.get(`http://localhost:5000/api/v1/auth/me/${userId}`).then((res)=>{
      
  		setUser(res.data.data);
      setFriendsCount(res.data.data.friends)
  		axios.get(`http://localhost:5000/api/v1/posts/${userId}`).then((res)=>{
  			setPost(res.data.data);
        console.log("--------",post)
  			setNoOfPost(res.data.data)
  		}).then(()=>{
        axios.get(`http://localhost:5000/api/v1/getfriends/${myId}/${userId}`).then((response)=>{
          if(response.data.success===true){
            setIsFriend(true)
          }
          else if(response.data.success===false){
            setIsFriend(false)
          }
        }).catch((err)=>{console.log(err)})
      })
  	}).catch((err)=>{console.log(err)})
   },[isFriend])


  const addFriend = () => {
    const myId = sessionStorage.getItem("userId");
    axios
      .post(`http://localhost:5000/api/v1/request`, { userId, myId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unFriend = (userId) => {
    const myId = sessionStorage.getItem("userId");
    axios.delete(
      `http://localhost:5000/api/v1/request/unfriend/${myId}/${userId}`
    ).then((res)=>{
        setIsFriend(false)
    })
  };
  const formActive =()=>{
    setIsFriendFormActive((prevState)=>!prevState)
    console.log(isFriendFormActive)
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
                  src={ user.profilepic === "no-photo.jpg"
                  ? defaultPic
                  : `http://localhost:5000/public/${user.profilepic}`}
                  alt=""
                ></img>
              </div>
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">Hello My friends!</span>
              <div className="profile-stat">
                <div>
                  <span class="profile-stat-count">
                    <strong>{noOfPost.length}</strong>posts
                  </span>
                </div>
                <div>
                  <span class="profile-stat-count" onClick={()=>{formActive()}}>
                    <strong>{friendsCount.length}</strong>friends
                  </span>
                </div>
              </div>
              <div className="addFriend-btn">
                {!isFriend && (
                  <Button variant="contained" onClick={() => addFriend()}>
                    <PersonAdd></PersonAdd> Add friend
                  </Button>
                )}
                {isFriend && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      unFriend(user._id);
                    }}
                  >
                    <PersonRemoveOutlined></PersonRemoveOutlined>Un friend
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userPost={post}></Feed>
            <Rightbar></Rightbar>
          </div>
        </div>
      </div>
      {isFriendFormActive&&<FriendsForm open = {isFriendFormActive} setOpen={setIsFriendFormActive} userId = {userId} ></FriendsForm>}
    </>
  );
};
export default UserProfile;
