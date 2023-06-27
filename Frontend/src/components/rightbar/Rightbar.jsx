import { useEffect, useState } from "react";
import "./rightbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomeRightbar = () => {
  const [myFriendsbday, setMyFriendsbday] = useState([])
  const [showRemaining, setShowRemaining] = useState(false);
  useEffect(()=>{
    const myId = sessionStorage.getItem("userId")
    axios.get('http://localhost:5000/api/v1/users/'+myId).then((res)=>{
      console.log("Home rightbar", res.data)
      setMyFriendsbday(res.data.data)
    })
  },[])
 
  return (
    <>
    
      <div className="birthdayContainer">
        {myFriendsbday.length>0 &&(<>
          <img className="birthdayImg" src="/assets/gift.png" alt=""></img>
        <span className="birthdayText">
          {myFriendsbday.map((friend,index)=>(
            <span key={friend._id}>
              <b>{friend.name}</b> {index !== myFriendsbday.length - 1 && ','}
            </span>
          ))}
          {' '} have a birthday today
        </span>
        </>)}
    
      </div>
      <img className="rightbarAd" src="/assets/ad.jpg" alt=""></img>

    </>
  );
};
const Rightbar = () => {

  const myId = sessionStorage.getItem('userId')
  const navigate = useNavigate()

  const ProfileRightbar = () => {
    const [myFriends, setMyFriends] = useState([]);
    const[userInfo, setUserInfo] = useState([])
	const defaultPic = "/assets/person/default-avatar.jpg";
    useEffect(() => {
      const userId = sessionStorage.getItem("userId");
      axios
        .get(`http://localhost:5000/api/v1/getfriends/${userId}`)
        .then((res) => {
      
          setMyFriends(res.data.data);
          
        });
    }, []);
    useEffect(()=>{
     
      axios.get(`http://localhost:5000/api/v1/auth/me/${myId}`).then((res)=>{
        
        setUserInfo(res.data.data)
      })
    },[])
    return (
      <>
        <h4 className="rightbarTitle">Your information </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{userInfo.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{userInfo.country}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{userInfo.relationship}</span>
          </div>
          <h4 className="rightbarTitle">Your friends</h4>

          <div className="rightbarFollowings">
            {myFriends.map((friend) => (
              <div className="rightbarFollowing" onClick={()=>navigate(`/userprofile/${friend._id}`)}>
                <img
                  src={ friend.profilepic === "no-photo.jpg"
				  ? defaultPic
				  : `http://localhost:5000/public/${friend.profilepic}`}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.name}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <HomeRightbar></HomeRightbar>
        <ProfileRightbar></ProfileRightbar>
      </div>
    </div>
  );
};
export default Rightbar;
