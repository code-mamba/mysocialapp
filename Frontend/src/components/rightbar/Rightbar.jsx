import { useEffect, useState } from "react";
import "./rightbar.css";
import axios from "axios";
const Rightbar = () => {
 
  const myId = sessionStorage.getItem('userId')
  const HomeRightbar = () => {
  
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt=""></img>
          <span className="birthdayText">
            <b>Madee</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.jpg" alt=""></img>
        <h4 className="rightbarTitle">Online Friends</h4>
        <h4 className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                className="rightbarProfileImg"
                src="assets/person/3.jpg"
                alt=""
              ></img>
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">John Carter</span>
          </li>
        </h4>
      </>
    );
  };
  const ProfileRightbar = () => {
    const [myFriends, setMyFriends] = useState([]);
    const[userInfo, setUserInfo] = useState([])
	const defaultPic = "assets/person/default-avatar.jpg";
    useEffect(() => {
      const userId = sessionStorage.getItem("userId");
      axios
        .get(`http://localhost:5000/api/v1/getfriends/${userId}`)
        .then((res) => {
          console.log("rightbar response", res.data.data);
          setMyFriends(res.data.data);
          
        });
    }, []);
    useEffect(()=>{
     
      axios.get(`http://localhost:5000/api/v1/auth/me/${myId}`).then((res)=>{
        console.log(res.data.data)
        setUserInfo(res.data.data)
      })
    },[])
    console.log("line55",userInfo)
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
              <div className="rightbarFollowing">
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
