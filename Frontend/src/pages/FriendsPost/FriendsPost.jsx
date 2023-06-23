import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
const FriendsPost = () => {
  const [friendsPost, setFriendsPost] = useState([]);
  useEffect(() => {
    const myId = sessionStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/api/v1/friendspost/${myId}`)
      .then((res) => {
        setFriendsPost(res.data.data);
      });
  }, []);
  return (
    <>
      <Topbar></Topbar>
      <div className="homeContainer">
        <Sidebar></Sidebar>
        <Feed friendsPost={friendsPost}></Feed>
        <Rightbar></Rightbar>
      </div>
    </>
  );
};
export default FriendsPost;
