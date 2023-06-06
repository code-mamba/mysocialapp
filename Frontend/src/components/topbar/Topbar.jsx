import "./topbar.css";
import { useEffect, useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormDialogue from "../../pages/FormDialogue/FormDialogue";
import RequestNotification from "../../pages/RequestNotification/RequestNotification";
const Topbar = () => {
  const [user, setUser] = useState([]);
  const defaultPic = "/assets/person/default-avatar.jpg";
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm,setShowForm] = useState(false)
  const[showNotification, setShowNotification] = useState(false)
  const[requestCount, setRequestCount] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/api/v1/auth/me/${userId}`)
      .then((res) => {
        setUser(res.data.data);
        setRequestCount(res.data.data.pendingrequest.length)
        console.log("topbar",res)
      })
      .catch((err) => {
        console.log("topbar catch", err);
      });
  }, [requestCount]);

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const PopupForm = () =>{
    setShowForm((prevState)=>!prevState)
  }
  const requestNotification =()=>{
    setShowNotification((prevState)=>!prevState)
  }
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft" onClick={()=>navigate('/home')}>
          <span className="logo">MyFB</span>
        </div>
        <div className="topbarRight">
          <div className="searchbar">
            <Search className="searchIcon"></Search>
            <input
              placeholder="Search for friend, post or videos"
              className="searchInput"
            ></input>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarlinks">
            <span className="topbarlink">Homepage</span>
            <span className="topbarlink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div
              className="topbarIconItem"
              onClick={() => navigate("/myProfile")}
            >
              <Person></Person>
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat></Chat>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem" onClick={()=>{requestNotification()}}>
              <Notifications></Notifications>
              <span className="topbarIconBadge">{requestCount}</span>
            </div>
          </div>
          <div className="myProfile" onClick={() => toggleDropdown()}>
            <img
              src={
                user.profilepic === "no-photo.jpg"
                  ? defaultPic
                  : user.profilepic
              }
              alt=""
              className="topbarImg"
            ></img>
          </div>
        </div>
      </div>
      {showDropdown && (
        <span className="profile-dropdown" onClick={()=>PopupForm()}> 
          Edit profile
        </span>
      )}
      {showForm&&<FormDialogue open={showForm} setOpen = {setShowForm}></FormDialogue>}
      {showNotification&&<RequestNotification open={showNotification} setOpen = {setShowNotification} ></RequestNotification>}
    </>
  );
};
export default Topbar;
