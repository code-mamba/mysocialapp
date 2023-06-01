import "./myProfile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SharePhoto from "../../components/share/sharePhoto/SharePhoto";
const Profile = () => {
  const [user, setUser] = useState([]);
  const[postCount, setPostCount] = useState(null)
  const[followersCount, setFollowersCount] = useState([])
  const [myPosts, setMyPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const defaultPic = "assets/person/default-avatar.jpg";

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    axios.get(`http://localhost:5000/api/v1/auth/me/${userId}`).then((res) => {
      setFollowersCount(res.data.data.friends.length);
      setUser(res.data.data);
      console.log(user);
    });
    console.log("hello");
    axios.get(`http://localhost:5000/api/v1/posts/${userId}`).then((res) => {
      setMyPosts(res.data.data);
      console.log(res)
      setPostCount(res.data.count)
      console.log("myProfile", myPosts);
    });
  }, []);

  const formControl = () => {
    if (showPopup === false) {
      setShowPopup(true);
      console.log(showPopup);
    } else if (showPopup === true) {
      setShowPopup(false);
      console.log(showPopup);
    }
  };
  console.log(user.profilepic);
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
                src="assets/posts/3.jpg"
                alt=""
              ></img>
              <div className="profile">
                <img
                  className="profileUserImg"
                  src={
                    user.profilepic === "no-photo.jpg"
                      ? defaultPic
                      : user.profilepic
                  }
                  alt=""
                ></img>
              </div>
              {showPopup && (
                <SharePhoto
                  open={showPopup}
                  title="Change something"
                  onClose={formControl}
                ></SharePhoto>
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">Hello My friends!</span>
              <div className="profile-stat">
                <div>
                    <span class="profile-stat-count"><strong>{postCount}</strong>posts</span>
                  </div>
                  <div>
                    <span class="profile-stat-count"><strong>{followersCount}</strong>followers</span>
                  </div>
                  <div>
                    <span class="profile-stat-count"><strong>206</strong>following</span>
                  </div>
              </div>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed myPosts={myPosts}></Feed>
            <Rightbar myPosts={myPosts}></Rightbar>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
